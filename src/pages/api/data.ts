import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// Pokemon data
const handlePokemon = async (prisma: PrismaClient) => {
    // Clear table
    await prisma.pokemon.deleteMany({});

    // Test create
    await prisma.pokemon.create({
        data: {
            slug: "bulbasaur",
            name: "Bulbasaur",
            types: ["grass", "poison"],
        },
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (process.env.NODE_ENV === "development") {
        const updated: string[] = [];
        const prisma = new PrismaClient();

        // Update Pokemon data if requested
        if ("pokemon" in req.query) {
            console.log("Updating Pokemon...");
            await handlePokemon(prisma);
            updated.push("Pokemon");
        }

        return res.status(200).json({ updated: updated });
    } else {
        return res.status(403).json("Forbidden");
    }
}
