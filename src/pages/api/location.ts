import type { NextApiRequest, NextApiResponse } from "next";

import { LocationClient } from "pokenode-ts";

type ResData = {
    location?: string;
    error?: string;
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
                res.status(200).json({ location: JSON.stringify(location) });
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
