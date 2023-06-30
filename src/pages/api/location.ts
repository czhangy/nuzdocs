import type { NextApiRequest, NextApiResponse } from "next";

import { LocationClient } from "pokenode-ts";

import LocationData from "@/models/LocationData";

type LocationName = {
    language: {
        name: string;
        url: string;
    };
    name: string;
};

type ResData = {
    location?: string;
    error?: string;
};

const getEnglishLocationName: (names: LocationName[]) => string = (
    names: LocationName[]
) => {
    const nameObj: LocationName = names.find(
        (name) => name.language.name === "en"
    )!;
    return nameObj.name;
};

const fetchLocation = async (locationName: string) => {
    const api = new LocationClient();
    const location = await api
        .getLocationByName(locationName)
        .catch((error) => {
            throw error;
        });
    return {
        locationName: getEnglishLocationName(location.names),
        areaNames: location.areas.map((area) => area.name),
    };
};

const fetchArea = async (areaName: string) => {
    const api = new LocationClient();
    const area = await api.getLocationAreaByName(areaName).catch((error) => {
        throw error;
    });
    console.log(area);
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
        typeof req.query.areaName === "string"
    ) {
        fetchArea(req.query.areaName);
        res.status(200).json({});
    } else if (req.method === "GET") {
        res.status(400).json({
            error: "A location slug must be specified",
        });
    } else {
        res.status(405).json({
            error: "Only GET requests are allowed at this route",
        });
    }
}
