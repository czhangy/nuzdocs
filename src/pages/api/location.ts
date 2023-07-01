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
    area?: string;
    error?: string;
};

const getEnglishName: (names: Name[]) => string = (names: Name[]) => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

const getEncounterDataForSinglePokemon = (
    pokemonEncounter: PokemonEncounter,
    gameName: string
) => {
    let encounterData: EncounterData[] = [];
    const versionDetails = pokemonEncounter.version_details;
    const versionEncounterDetails: VersionEncounterDetail =
        versionDetails.filter(
            (ved: VersionEncounterDetail) => ved.version.name === gameName
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
    gameName: string
) => {
    let encounterData: EncounterData[] = [];
    pokemonEncounters.forEach((pokemonEncounter: PokemonEncounter) => {
        const pokemonEncounterData: EncounterData[] =
            getEncounterDataForSinglePokemon(pokemonEncounter, gameName);
        pokemonEncounterData.forEach((data: EncounterData) => {
            encounterData.push(data);
        });
    });
    return encounterData;
};

const fetchLocation = async (locationName: string) => {
    const api: LocationClient = new LocationClient();
    const location: Location = await api
        .getLocationByName(locationName)
        .catch((error) => {
            throw error;
        });
    return {
        locationName: getEnglishName(location.names),
        areaNames: location.areas.map((area) => area.name),
    };
};

const fetchArea = async (areaName: string, gameName: string) => {
    const api: LocationClient = new LocationClient();
    const area: LocationArea = await api
        .getLocationAreaByName(areaName)
        .catch((error) => {
            throw error;
        });
    return {
        areaName: getEnglishName(area.names),
        encounters: getEncounterDataForAllPokemon(
            area.pokemon_encounters,
            gameName
        ),
    };
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {
    if (
        req.method === "GET" &&
        "locationName" in req.query &&
        typeof req.query.locationName === "string"
    ) {
        const location: void | LocationData = await fetchLocation(
            req.query.locationName
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
        "areaName" in req.query &&
        "gameName" in req.query &&
        typeof req.query.areaName === "string" &&
        typeof req.query.gameName === "string"
    ) {
        const area: void | AreaData = await fetchArea(
            req.query.areaName,
            req.query.gameName
        ).catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
        res.status(200).json({ area: JSON.stringify(area) });
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
