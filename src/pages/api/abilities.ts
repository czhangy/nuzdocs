import AbilityData from "@/models/AbilityData";
import { initAbilityData } from "@/utils/initializers";
import type { NextApiRequest, NextApiResponse } from "next";
import { Ability, AbilityFlavorText, PokemonClient } from "pokenode-ts";

type ResData = {
    ability?: string;
    error?: string;
};

const isAbilityRequest = (req: NextApiRequest): boolean => {
    return (
        req.method === "GET" &&
        "ability" in req.query &&
        typeof req.query.ability === "string" &&
        "versionGroup" in req.query &&
        typeof req.query.versionGroup === "string"
    );
};

const isAbilityListRequest = (req: NextApiRequest): boolean => {
    return (
        req.method === "GET" &&
        "ability[]" in req.query &&
        Array.isArray(req.query["ability[]"]) &&
        "versionGroup" in req.query &&
        typeof req.query.versionGroup === "string"
    );
};

const fetchAbility = async (slug: string, versionGroup: string): Promise<AbilityData | null> => {
    const api: PokemonClient = new PokemonClient();
    try {
        const ability: Ability = await api.getAbilityByName(slug);
        const entry: AbilityFlavorText | undefined = ability.flavor_text_entries.find(
            (ft: AbilityFlavorText) => ft.language.name === "en" && ft.version_group.name === versionGroup
        );
        if (entry === undefined) {
            return null;
        } else {
            return initAbilityData(ability, versionGroup, entry.flavor_text);
        }
    } catch (error: any) {
        throw error;
    }
};

const fetchAbilities = async (slugs: string[], versionGroup: string): Promise<AbilityData[]> => {
    let promises: Promise<AbilityData | null>[] = [];
    slugs.forEach((slug: string) => {
        promises.push(fetchAbility(slug, versionGroup));
    });
    try {
        return (await Promise.all(promises)).filter((ability: AbilityData | null) => ability !== null) as AbilityData[];
    } catch (error: any) {
        throw error;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    if (isAbilityRequest(req)) {
        try {
            const ability: AbilityData | null = await fetchAbility(
                req.query.ability as string,
                req.query.versionGroup as string
            );
            return res.status(200).json({ ability: JSON.stringify(ability) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (isAbilityListRequest(req)) {
        try {
            const abilities: AbilityData[] = await fetchAbilities(
                req.query["ability[]"] as string[],
                req.query.versionGroup as string
            );
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
