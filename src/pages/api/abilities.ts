import AbilityData from "@/models/AbilityData";
import { initAbilityData } from "@/utils/initializers";
import type { NextApiRequest, NextApiResponse } from "next";
import { Ability, PokemonClient } from "pokenode-ts";

type ResData = {
    ability?: string;
    error?: string;
};

const isAbilityRequest = (req: NextApiRequest): boolean => {
    return req.method === "GET" && "abilitySlug" in req.query && typeof req.query.abilitySlug === "string";
};

const isAbilityListRequest = (req: NextApiRequest): boolean => {
    return req.method === "GET" && "abilitySlug[]" in req.query && Array.isArray(req.query["abilitySlug[]"]);
};

const fetchAbility = async (abilitySlug: string): Promise<AbilityData> => {
    const api: PokemonClient = new PokemonClient();
    try {
        const ability: Ability = await api.getAbilityByName(abilitySlug);
        return initAbilityData(abilitySlug, ability.names);
    } catch (error: any) {
        throw error;
    }
};

const fetchAbilityList = async (abilitySlugs: string[]): Promise<AbilityData[]> => {
    let abilityPromises: Promise<AbilityData>[] = [];
    abilitySlugs.forEach((abilitySlug: string) => {
        abilityPromises.push(fetchAbility(abilitySlug));
    });
    try {
        return await Promise.all(abilityPromises);
    } catch (error: any) {
        throw error;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    if (isAbilityRequest(req)) {
        try {
            const ability: AbilityData = await fetchAbility(req.query.abilitySlug as string);
            return res.status(200).json({ ability: JSON.stringify(ability) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (isAbilityListRequest(req)) {
        try {
            const abilities: AbilityData[] = await fetchAbilityList(req.query["abilitySlug[]"] as string[]);
            return res.status(200).json({ ability: JSON.stringify(abilities) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (req.method === "GET") {
        return res.status(400).json({
            error: "The request is missing required params",
        });
    } else {
        return res.status(405).json({
            error: "Only GET requests are allowed at this route",
        });
    }
}
