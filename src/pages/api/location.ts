import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import LocationData from "@/models/LocationData";
import { initAreaData, initEncounterData, initLocationData } from "@/utils/initializers";
import { getEncounterMethodName } from "@/utils/utils";
import groupBy from "lodash/groupBy";
import type { NextApiRequest, NextApiResponse } from "next";
import {
    Encounter,
    Location,
    LocationArea,
    LocationClient,
    PokemonEncounter,
    VersionEncounterDetail,
} from "pokenode-ts";

type ResData = {
    location?: string;
    areaList?: string;
    error?: any;
};

const getEncounterDataForSinglePokemon = (pokemonEncounter: PokemonEncounter, gameSlug: string): EncounterData[] => {
    let encounterData: EncounterData[] = [];
    const versionDetails = pokemonEncounter.version_details;
    const versionEncounterDetails: VersionEncounterDetail = versionDetails.filter(
        (ved: VersionEncounterDetail) => ved.version.name === gameSlug
    )[0];
    const encounters: Encounter[] = versionEncounterDetails.encounter_details;
    const groupedEncounters = groupBy(encounters, (encounter: Encounter) =>
        getEncounterMethodName(encounter.method.name, encounter.condition_values)
    );
    for (let method in groupedEncounters) {
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

const fetchArea = async (areaSlug: string, gameSlug: string): Promise<AreaData> => {
    const api: LocationClient = new LocationClient();
    try {
        const area: LocationArea = await api.getLocationAreaByName(areaSlug);
        const encounters: EncounterData[] = getEncounterDataForAllPokemon(area.pokemon_encounters, gameSlug);
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
