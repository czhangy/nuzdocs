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

// Trainer access
export const getTrainer = (gameSlug: string, battleSlug: string, starterSlug: string): Trainer => {
    const segments: { [segmentSlug: string]: Segment } = getSegmentsObject(gameSlug);
    const battleSegment: BattleSegment = segments[battleSlug].segment as BattleSegment;
    if ("trainer" in battleSegment.battle) {
        return (battleSegment.battle as Battle).trainer;
    } else {
        return (battleSegment.battle[starterSlug] as Battle).trainer;
    }
};

export const getTrainerName = (gameSlug: string, battleSlug: string, starterSlug: string): string => {
    return getTrainer(gameSlug, battleSlug, starterSlug).name;
};

export const getTrainerSprite = (gameSlug: string, battleSlug: string, starterSlug: string): string => {
    return getTrainer(gameSlug, battleSlug, starterSlug).sprite;
};
