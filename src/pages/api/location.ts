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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {
    if (
        req.method === "GET" &&
        "location" in req.query &&
        typeof req.query.location === "string"
    ) {
        const api = new LocationClient();
        await api
            .getLocationByName(req.query.location)
            .then((location) => {
                let locationData: LocationData = {
                    name: getEnglishLocationName(location.names),
                    encounters: [],
                };
                res.status(200).json({
                    location: JSON.stringify(locationData),
                });
            })
            .catch((error) =>
                res.status(500).json({
                    error: error,
                })
            );
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
