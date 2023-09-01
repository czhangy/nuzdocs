import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import LocationData from "@/models/LocationData";
import { getGameData } from "@/utils/game";
import { initAreaData, initEncounterData, initLocationData } from "@/utils/initializers";
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
import translations from "@/static/translations";

type ResData = {
    location?: string;
    areaList?: string;
    error?: any;
};

const fetchLocation = async (slug: string): Promise<LocationData> => {
    const api: LocationClient = new LocationClient();
    try {
        const location: Location = await api.getLocationByName(slug);
        const areas: string[] = location.areas.map((area) => area.name);
        return initLocationData(slug, location.names, areas);
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
    const methodName: string =
        encounterDetail.method.name in translations.encounter_methods
            ? translations.encounter_methods[encounterDetail.method.name]
            : encounterDetail.method.name;
    if (!(methodName in encounterData[timeCondition])) {
        encounterData[timeCondition][methodName] = [];
    }
    const encounter: EncounterData | undefined = encounterData[timeCondition][methodName].find(
        (ed: EncounterData) => ed.pokemonSlug === pokemonSlug
    );
    if (encounter) {
        encounter.chance += encounterDetail.chance;
        encounter.minLevel = Math.min(encounter.minLevel, encounterDetail.min_level);
        encounter.maxLevel = Math.min(encounter.maxLevel, encounterDetail.max_level);
    } else {
        encounterData[timeCondition][methodName].push(
            initEncounterData(
                pokemonSlug,
                methodName,
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
            getGameData(gameSlug).invalidConditions.includes(cv.name)
        )
    ) {
        return;
    }
    for (const tc of Object.keys(encounterData)) {
        handleTimeBasedEncounter(tc, pokemonSlug, encounterDetail, encounterData);
    }
};

const sortEncounterData = (encounterData: {
    [conditionValue: string]: { [method: string]: EncounterData[] };
}): void => {
    for (const methodGroup of Object.values(encounterData)) {
        for (const encounters of Object.values(methodGroup)) {
            encounters.sort((a: EncounterData, b: EncounterData) => b.chance - a.chance);
        }
    }
};

const getEncounterData = (
    pokemonEncounters: PokemonEncounter[],
    gameSlug: string,
    encounterData: { [conditionValue: string]: { [method: string]: EncounterData[] } }
): boolean => {
    let usesTime = false;
    for (const pokemonEncounter of pokemonEncounters) {
        if (getGameData(gameSlug).starters.includes(pokemonEncounter.pokemon.name)) {
            continue;
        }
        const versionDetail: VersionEncounterDetail | undefined = pokemonEncounter.version_details.find(
            (vd: VersionEncounterDetail) => vd.version.name === gameSlug
        );
        if (versionDetail) {
            for (const encounterDetail of versionDetail.encounter_details) {
                const timeCondition: NamedAPIResource | undefined = encounterDetail.condition_values.find(
                    (cv: NamedAPIResource) => Object.keys(encounterData).includes(cv.name)
                );
                if (timeCondition) {
                    usesTime = true;
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
    sortEncounterData(encounterData);
    return usesTime;
};

const fetchArea = async (areaSlug: string, gameSlug: string): Promise<AreaData> => {
    const api: LocationClient = new LocationClient();
    try {
        const area: LocationArea = await api.getLocationAreaByName(areaSlug);
        const encounterData: { [conditionValue: string]: { [method: string]: EncounterData[] } } = {
            "time-morning": {},
            "time-day": {},
            "time-night": {},
        };
        const usesTime: boolean = getEncounterData(area.pokemon_encounters, gameSlug, encounterData);
        return initAreaData(area.names, encounterData, usesTime);
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
