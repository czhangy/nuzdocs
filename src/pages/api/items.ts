import AbilityData from "@/models/AbilityData";
import ItemData from "@/models/ItemData";
import { initAbilityData, initItemData } from "@/utils/initializers";
import type { NextApiRequest, NextApiResponse } from "next";
import { Ability, Item, ItemClient, PokemonClient } from "pokenode-ts";

type ResData = {
    item?: string;
    error?: string;
};

const isItemRequest = (req: NextApiRequest): boolean => {
    return (
        req.method === "GET" &&
        "item" in req.query &&
        typeof req.query.item === "string" &&
        "versionGroup" in req.query &&
        typeof req.query.versionGroup === "string"
    );
};

const isItemListRequest = (req: NextApiRequest): boolean => {
    return (
        req.method === "GET" &&
        "item[]" in req.query &&
        Array.isArray(req.query["item[]"]) &&
        "versionGroup" in req.query &&
        typeof req.query.versionGroup === "string"
    );
};

const fetchItem = async (item: string, versionGroup: string): Promise<ItemData> => {
    const api: ItemClient = new ItemClient();
    try {
        return initItemData(await api.getItemByName(item), versionGroup);
    } catch (error: any) {
        throw error;
    }
};

const fetchItems = async (items: string[], versionGroup: string): Promise<ItemData[]> => {
    let itemPromises: Promise<ItemData>[] = [];
    items.forEach((item: string) => {
        itemPromises.push(fetchItem(item, versionGroup));
    });
    try {
        return await Promise.all(itemPromises);
    } catch (error: any) {
        throw error;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    if (isItemRequest(req)) {
        try {
            const item: ItemData = await fetchItem(req.query.item as string, req.query.versionGroup as string);
            return res.status(200).json({ item: JSON.stringify(item) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (isItemListRequest(req)) {
        try {
            const items: ItemData[] = await fetchItems(
                req.query["item[]"] as string[],
                req.query.versionGroup as string
            );
            return res.status(200).json({ item: JSON.stringify(items) });
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
