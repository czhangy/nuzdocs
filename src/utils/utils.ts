import Battle from "@/models/Battle";
import BattleSegment from "@/models/BattleSegment";
import Segment from "@/models/Segment";
import Trainer from "@/models/Trainer";
import games from "@/static/games";
import tiers from "@/static/tiers";
import { Name } from "pokenode-ts";

export const getEnglishName: (names: Name[]) => string = (names: Name[]): string => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

export const getPokemonTier = (pokemonSlug: string, versionGroup: string): string => {
    return pokemonSlug in tiers[versionGroup] ? tiers[versionGroup][pokemonSlug] : "?";
};
