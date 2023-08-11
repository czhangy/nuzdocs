import MoveData from "@/models/MoveData";
import { initMoveData } from "@/utils/initializers";
import type { NextApiRequest, NextApiResponse } from "next";
import { MoveClient } from "pokenode-ts";

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

const fetchMove = async (slug: string): Promise<MoveData> => {
    const api: MoveClient = new MoveClient();
    try {
        return initMoveData(await api.getMoveByName(slug));
    } catch (error: any) {
        throw error;
    }
};

const fetchListOfMoves = async (moveSlugs: string[]): Promise<MoveData[]> => {
    let promises: Promise<MoveData>[] = [];
    moveSlugs.forEach((moveSlug: string) => {
        promises.push(fetchMove(moveSlug));
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
            const move: MoveData = await fetchMove(req.query.slugs as string);
            return res.status(200).json({ moves: JSON.stringify(move) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (isMoveListRequest(req)) {
        try {
            const moves: MoveData[] = await fetchListOfMoves(req.query["slugs[]"] as string[]);
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
