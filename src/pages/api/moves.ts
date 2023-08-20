import MoveData from "@/models/MoveData";
import priorities from "@/static/priorities";
import { initMoveData } from "@/utils/initializers";
import type { NextApiRequest, NextApiResponse } from "next";
import { Move, MoveClient, NamedAPIResource, PastMoveStatValues, VerboseEffect } from "pokenode-ts";

type ResData = {
    moves?: string;
    error?: string;
};

const isMoveRequest = (req: NextApiRequest): boolean => {
    return (
        req.method === "GET" &&
        "slugs" in req.query &&
        typeof req.query.slugs === "string" &&
        "group" in req.query &&
        typeof req.query.group === "string"
    );
};

const isMoveListRequest = (req: NextApiRequest): boolean => {
    return (
        req.method === "GET" &&
        "slugs[]" in req.query &&
        Array.isArray(req.query["slugs[]"]) &&
        "group" in req.query &&
        typeof req.query.group === "string"
    );
};

const fetchMove = async (slug: string, group: string): Promise<MoveData> => {
    const api: MoveClient = new MoveClient();
    try {
        const move: Move = await api.getMoveByName(slug);
        let type: NamedAPIResource = move.type;
        let power: number | null = move.power;
        let pp: number | null = move.pp;
        let effectChance: number | null = move.effect_chance;
        const pastMoves: PastMoveStatValues[] = move.past_values.filter(
            (move: PastMoveStatValues) =>
                priorities.groups.indexOf(move.version_group.name) > priorities.groups.indexOf(group)
        );
        if (pastMoves.length > 0) {
            pastMoves.sort(
                (a: PastMoveStatValues, b: PastMoveStatValues) =>
                    priorities.groups.indexOf(a.version_group.name) - priorities.groups.indexOf(b.version_group.name)
            );
            type = pastMoves[0].type ? pastMoves[0].type : type;
            power = pastMoves[0].power ? pastMoves[0].power : power;
            pp = pastMoves[0].pp ? pastMoves[0].pp : pp;
            effectChance = pastMoves[0].effect_chance ? pastMoves[0].effect_chance : effectChance;
        }
        const desc: string = move.effect_entries
            .find((effect: VerboseEffect) => effect.language.name === "en")!
            .short_effect.replaceAll("$effect_chance", String(effectChance));
        return initMoveData(move, type, power, pp, desc);
    } catch (error: any) {
        throw error;
    }
};

const fetchListOfMoves = async (slugs: string[], group: string): Promise<MoveData[]> => {
    let promises: Promise<MoveData>[] = [];
    slugs.forEach((slug: string) => {
        promises.push(fetchMove(slug, group));
    });
    try {
        return await Promise.all(promises);
    } catch (error: any) {
        throw error;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    if (isMoveRequest(req)) {
        try {
            const move: MoveData = await fetchMove(req.query.slugs as string, req.query.group as string);
            return res.status(200).json({ moves: JSON.stringify(move) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (isMoveListRequest(req)) {
        try {
            const moves: MoveData[] = await fetchListOfMoves(
                req.query["slugs[]"] as string[],
                req.query.group as string
            );
            return res.status(200).json({ moves: JSON.stringify(moves) });
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
