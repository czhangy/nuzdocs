import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import LocationData from "@/models/LocationData";
import games from "@/static/games";
import translations from "@/static/translations";
import { getGameGroup } from "@/utils/game";
import { initAreaData, initEncounterData, initLocationData } from "@/utils/initializers";
import groupBy from "lodash/groupBy";
import type { NextApiRequest, NextApiResponse } from "next";
import {
    Encounter,
    Location,
    LocationArea,
    LocationClient,
    NamedAPIResource,
    PokemonEncounter,
    VersionEncounterDetail,
} from "pokenode-ts";

type ResData = {
    location?: string;
    areaList?: string;
    error?: any;
};

export const getEncounterMethodName = (
    methodSlug: string,
    conditionValues: NamedAPIResource[],
    gameSlug: string
): string => {
    let methodName: string =
        methodSlug in translations.encounter_methods ? translations.encounter_methods[methodSlug] : methodSlug;
    if (conditionValues.length > 0) {
        // Ignore compounding conditions that are trivial and shouldn't be split on
        conditionValues = conditionValues.filter((cv: NamedAPIResource) => {
            return !games[gameSlug].gameGroup.ignoredConditions.includes(cv.name);
        });
        methodName += " (";
        conditionValues.forEach((cv: NamedAPIResource, i: number) => {
            if (i > 0) {
                methodName += " + ";
            }
            methodName +=
                cv.name in translations.encounter_conditions ? translations.encounter_conditions[cv.name] : cv.name;
        });
        methodName += ")";
    }
    return methodName;
};

const getEncounterDataForSinglePokemon = (pokemonEncounter: PokemonEncounter, gameSlug: string): EncounterData[] => {
    let encounterData: EncounterData[] = [];
    const versionDetails = pokemonEncounter.version_details;
    const versionEncounterDetails: VersionEncounterDetail = versionDetails.find(
        (ved: VersionEncounterDetail) => ved.version.name === gameSlug
    )!;
    const encounters: Encounter[] = versionEncounterDetails.encounter_details;
    const groupedEncounters = groupBy(encounters, (encounter: Encounter) =>
        getEncounterMethodName(encounter.method.name, encounter.condition_values, gameSlug)
    );
    for (let method in groupedEncounters) {
        // Skip specified methods for version group
        if (games[gameSlug].gameGroup.invalidConditions.some((condition: string) => method.includes(condition))) {
            continue;
        }
        const chance: number = groupedEncounters[method].reduce(
            (sum: number, encounter: Encounter) => sum + encounter.chance,
            0
        );
        const minLevel: number = Math.min.apply(
            null,
            groupedEncounters[method].map((encounter: Encounter) => {
                return encounter.min_level;
            })
        );
        const maxLevel: number = Math.max.apply(
            null,
            groupedEncounters[method].map((encounter: Encounter) => {
                return encounter.max_level;
            })
        );
        encounterData.push(initEncounterData(pokemonEncounter.pokemon.name, method, chance, minLevel, maxLevel));
    }
    return encounterData;
};

const getEncounterDataForAllPokemon = (pokemonEncounters: PokemonEncounter[], gameSlug: string): EncounterData[] => {
    let encounterData: EncounterData[][] = [];
    pokemonEncounters = pokemonEncounters.filter((pokemonEncounter: PokemonEncounter) =>
        pokemonEncounter.version_details.some((ved) => ved.version.name === gameSlug)
    );
    pokemonEncounters.forEach((pokemonEncounter: PokemonEncounter) => {
        encounterData.push(getEncounterDataForSinglePokemon(pokemonEncounter, gameSlug));
    });
    return encounterData.flat();
};

const fetchLocation = async (locationSlug: string): Promise<LocationData> => {
    const api: LocationClient = new LocationClient();
    try {
        const location: Location = await api.getLocationByName(locationSlug);
        const areaSlugList: string[] = location.areas.map((area) => area.name);
        return initLocationData(location.names, areaSlugList);
    } catch (error: any) {
        throw error;
    }
};

const handleTimeBasedEncounter = (
    timeCondition: string,
    pokemonSlug: string,
    encounterDetail: Encounter,
    encounterData: { [conditionValue: string]: { [method: string]: EncounterData[] } }
): void => {
    if (!(encounterDetail.method.name in encounterData[timeCondition])) {
        encounterData[timeCondition][encounterDetail.method.name] = [];
    }
    const encounter: EncounterData | undefined = encounterData[timeCondition][encounterDetail.method.name].find(
        (ed: EncounterData) => ed.pokemonSlug === pokemonSlug
    );
    if (encounter) {
        encounter.chance += encounterDetail.chance;
        encounter.minLevel = Math.min(encounter.minLevel, encounterDetail.min_level);
        encounter.maxLevel = Math.min(encounter.maxLevel, encounterDetail.max_level);
    } else {
        encounterData[timeCondition][encounterDetail.method.name].push(
            initEncounterData(
                pokemonSlug,
                encounterDetail.method.name,
                encounterDetail.chance,
                encounterDetail.min_level,
                encounterDetail.max_level
            )
        );
    }
};

const handleConstantEncounter = (
    gameSlug: string,
    pokemonSlug: string,
    encounterDetail: Encounter,
    encounterData: { [conditionValue: string]: { [method: string]: EncounterData[] } }
): void => {
    if (
        encounterDetail.condition_values.some((cv: NamedAPIResource) =>
            getGameGroup(gameSlug).invalidConditions.includes(cv.name)
        )
    ) {
        return;
    }
    for (const tc of Object.keys(encounterData)) {
        handleTimeBasedEncounter(tc, pokemonSlug, encounterDetail, encounterData);
    }
};

const getEncounterData = (
    pokemonEncounters: PokemonEncounter[],
    gameSlug: string
): { [conditionValue: string]: { [method: string]: EncounterData[] } } => {
    const encounterData: { [conditionValue: string]: { [method: string]: EncounterData[] } } = {
        "time-morning": {},
        "time-day": {},
        "time-night": {},
    };
    for (const pokemonEncounter of pokemonEncounters) {
        const versionDetail: VersionEncounterDetail | undefined = pokemonEncounter.version_details.find(
            (vd: VersionEncounterDetail) => vd.version.name === gameSlug
        );
        if (versionDetail) {
            for (const encounterDetail of versionDetail.encounter_details) {
                const timeCondition: NamedAPIResource | undefined = encounterDetail.condition_values.find(
                    (cv: NamedAPIResource) => Object.keys(encounterData).includes(cv.name)
                );
                if (timeCondition) {
                    handleTimeBasedEncounter(
                        timeCondition.name,
                        pokemonEncounter.pokemon.name,
                        encounterDetail,
                        encounterData
                    );
                } else {
                    handleConstantEncounter(gameSlug, pokemonEncounter.pokemon.name, encounterDetail, encounterData);
                }
            }
        }
    }
    console.log(encounterData["time-night"]);
    return encounterData;
};

const fetchArea = async (areaSlug: string, gameSlug: string): Promise<AreaData> => {
    const api: LocationClient = new LocationClient();
    try {
        const area: LocationArea = await api.getLocationAreaByName(areaSlug);
        const encounters: { [conditionValue: string]: { [method: string]: EncounterData[] } } = getEncounterData(
            area.pokemon_encounters,
            gameSlug
        );
        return initAreaData(area.names, encounters);
    } catch (error: any) {
        throw error;
    }
};

const fetchListOfAreas = async (areaSlugList: string[], gameSlug: string): Promise<AreaData[]> => {
    let areaPromises: Promise<AreaData>[] = [];
    areaSlugList.forEach((areaSlug: string) => {
        areaPromises.push(fetchArea(areaSlug, gameSlug));
    });
    try {
        return await Promise.all(areaPromises);
    } catch (error: any) {
        throw error;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    if (req.method === "GET" && "locationSlug" in req.query && typeof req.query.locationSlug === "string") {
        try {
            const location: void | LocationData = await fetchLocation(req.query.locationSlug);
            return res.status(200).json({
                location: JSON.stringify(location),
            });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (
        req.method === "GET" &&
        "areaSlugList[]" in req.query &&
        "gameSlug" in req.query &&
        (Array.isArray(req.query["areaSlugList[]"]) || typeof req.query["areaSlugList[]"] === "string") &&
        typeof req.query.gameSlug === "string"
    ) {
        const areaSlugList: string[] = Array.isArray(req.query["areaSlugList[]"])
            ? req.query["areaSlugList[]"]
            : [req.query["areaSlugList[]"]];
        try {
            const areaList: void | AreaData[] = await fetchListOfAreas(areaSlugList, req.query.gameSlug);
            return res.status(200).json({ areaList: JSON.stringify(areaList) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (req.method === "GET") {
        return res.status(400).json({
            error: "Required params are missing",
        });
    } else {
        return res.status(405).json({
            error: "Only GET requests are allowed at this route",
        });
    }
}
