import type { NextApiRequest, NextApiResponse } from "next";

import { PokemonClient } from "pokenode-ts";

type ResData = {
    pokemon?: string;
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {
    if (
        req.method === "GET" &&
        "name" in req.query &&
        typeof req.query.name === "string"
    ) {
        const api = new PokemonClient();
        await api
            .getPokemonByName(req.query.name)
            .then((pokemon) => {
                res.status(200).json({ pokemon: JSON.stringify(pokemon) });
            })
            .catch((error) =>
                res.status(500).json({
                    error: error,
                })
            );
    } else if (req.method === "GET") {
        res.status(400).json({
            error: "A Pokemon name must be specified",
        });
    } else {
        res.status(405).json({
            error: "Only GET requests are allowed at this route",
        });
    }
}
