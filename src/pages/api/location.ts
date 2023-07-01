import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import LocationData from "@/models/LocationData";
import groupBy from "lodash/groupBy";
import type { NextApiRequest, NextApiResponse } from "next";
import {
    Encounter,
    Location,
    LocationArea,
    LocationClient,
    Name,
    PokemonEncounter,
    VersionEncounterDetail,
} from "pokenode-ts";

type ResData = {
    location?: string;
    areaList?: string;
    error?: string;
};

const getEnglishName: (names: Name[]) => string = (names: Name[]) => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

const getEncounterDataForSinglePokemon = (
    pokemonEncounter: PokemonEncounter,
    gameSlug: string
) => {
    let encounterData: EncounterData[] = [];
    const versionDetails = pokemonEncounter.version_details;
    const versionEncounterDetails: VersionEncounterDetail =
        versionDetails.filter(
            (ved: VersionEncounterDetail) => ved.version.name === gameSlug
        )[0];
    const encounters: Encounter[] = versionEncounterDetails.encounter_details;
    const groupedEncounters = groupBy(
        encounters,
        (encounter: Encounter) => encounter.method.name
    );
    for (let method in groupedEncounters) {
        encounterData.push({
            pokemonName: pokemonEncounter.pokemon.name,
            method: method,
            chance: groupedEncounters[method].reduce(
                (sum: number, encounter: Encounter) => sum + encounter.chance,
                0
            ),
            minLevel: Math.min.apply(
                null,
                groupedEncounters[method].map((encounter: Encounter) => {
                    return encounter.min_level;
                })
            ),
            maxLevel: Math.max.apply(
                null,
                groupedEncounters[method].map((encounter: Encounter) => {
                    return encounter.max_level;
                })
            ),
        });
    }
    return encounterData;
};

const getEncounterDataForAllPokemon = (
    pokemonEncounters: PokemonEncounter[],
    gameSlug: string
) => {
    let encounterData: EncounterData[] = [];
    pokemonEncounters.forEach((pokemonEncounter: PokemonEncounter) => {
        const pokemonEncounterData: EncounterData[] =
            getEncounterDataForSinglePokemon(pokemonEncounter, gameSlug);
        pokemonEncounterData.forEach((data: EncounterData) => {
            encounterData.push(data);
        });
    });
    return encounterData;
};

const fetchLocation = async (locationSlug: string) => {
    const api: LocationClient = new LocationClient();
    const location: Location = await api
        .getLocationByName(locationSlug)
        .catch((error) => {
            throw error;
        });
    return {
        locationName: getEnglishName(location.names),
        areaSlugList: location.areas.map((area) => area.name),
    };
};

const fetchArea = async (areaSlug: string, gameSlug: string) => {
    const api: LocationClient = new LocationClient();
    const area: LocationArea = await api
        .getLocationAreaByName(areaSlug)
        .catch((error) => {
            throw error;
        });
    return {
        areaSlug: areaSlug,
        areaName: getEnglishName(area.names),
        encounters: getEncounterDataForAllPokemon(
            area.pokemon_encounters,
            gameSlug
        ),
    };
};

const fetchListOfAreas = async (areaSlugList: string[], gameSlug: string) => {
    let areaPromises: Promise<AreaData>[] = [];
    areaSlugList.forEach((areaSlug: string) => {
        areaPromises.push(
            fetchArea(areaSlug, gameSlug).catch((error) => {
                throw error;
            })
        );
    });
    return await Promise.all(areaPromises).then((areaList) => areaList);
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {
    if (
        req.method === "GET" &&
        "locationSlug" in req.query &&
        typeof req.query.locationSlug === "string"
    ) {
        const location: void | LocationData = await fetchLocation(
            req.query.locationSlug
        ).catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
        res.status(200).json({
            location: JSON.stringify(location),
        });
    } else if (
        req.method === "GET" &&
        "areaSlugList[]" in req.query &&
        "gameSlug" in req.query &&
        (Array.isArray(req.query["areaSlugList[]"]) ||
            typeof req.query["areaSlugList[]"] === "string") &&
        typeof req.query.gameSlug === "string"
    ) {
        const areaSlugList: string[] = Array.isArray(
            req.query["areaSlugList[]"]
        )
            ? req.query["areaSlugList[]"]
            : [req.query["areaSlugList[]"]];
        const areaList: void | AreaData[] = await fetchListOfAreas(
            areaSlugList,
            req.query.gameSlug
        ).catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
        res.status(200).json({ areaList: JSON.stringify(areaList) });
    } else if (req.method === "GET") {
        res.status(400).json({
            error: "Required params are missing",
        });
    } else {
        res.status(405).json({
            error: "Only GET requests are allowed at this route",
        });
    }
}
