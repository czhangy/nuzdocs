import MoveData from "@/models/MoveData";
import { initMoveData } from "@/utils/initializers";
import type { NextApiRequest, NextApiResponse } from "next";
import { Move, MoveClient, NamedAPIResource } from "pokenode-ts";

type ResData = {
    moves?: string;
    error?: string;
};

const isSingleMoveRequest = (req: NextApiRequest): boolean => {
    return req.method === "GET" && "moveSlugs[]" in req.query && typeof req.query["moveSlugs[]"] === "string";
};

const isMoveListRequest = (req: NextApiRequest): boolean => {
    return req.method === "GET" && "moveSlugs[]" in req.query && Array.isArray(req.query["moveSlugs[]"]);
};

const fetchMove = async (moveSlug: string): Promise<MoveData> => {
    const api: MoveClient = new MoveClient();
    try {
        const move: Move = await api.getMoveByName(moveSlug);
        return initMoveData(
            moveSlug,
            move.names,
            move.type,
            move.power,
            move.damage_class as NamedAPIResource,
            move.pp as number
        );
    } catch (error: any) {
        throw error;
    }
};

const fetchListOfMoves = async (moveSlugs: string[]): Promise<MoveData[]> => {
    let movePromises: Promise<MoveData>[] = [];
    moveSlugs.forEach((moveSlug: string) => {
        movePromises.push(fetchMove(moveSlug));
    });
    try {
        return await Promise.all(movePromises);
    } catch (error: any) {
        throw error;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    if (isSingleMoveRequest(req)) {
        try {
            const moveData: MoveData[] = [await fetchMove(req.query["moveSlugs[]"] as string)];
            return res.status(200).json({ moves: JSON.stringify(moveData) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (isMoveListRequest(req)) {
        try {
            const moveDataList: MoveData[] = await fetchListOfMoves(req.query["moveSlugs[]"] as string[]);
            return res.status(200).json({ moves: JSON.stringify(moveDataList) });
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
