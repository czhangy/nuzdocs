import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getSegments } from "./game";
import games from "@/static/games";

// Getters
export const getPB = (game: string): string => {
    const storedPBs: string | null = localStorage.getItem("pbs");
    return storedPBs ? JSON.parse(storedPBs)[game] : "";
};

export const getPlayedGames = (): string[] => {
    const attempts: string | null = localStorage.getItem("attempts");
    const priorities: string[] = Object.keys(games);
    return attempts
        ? Object.keys(JSON.parse(attempts)).sort(
              (a: string, b: string) => priorities.indexOf(a) - priorities.indexOf(b)
          )
        : [];
};

export const getNumAttempts = (game: string): number => {
    const storedAttempts: string | null = localStorage.getItem("attempts");
    if (storedAttempts !== null) {
        const attempts: { [game: string]: number } = JSON.parse(storedAttempts);
        if (game in attempts) {
            return attempts[game];
        }
    }
    return 0;
};

export const getNumHOFs = (game: string): number => {
    const storedHOFs: string | null = localStorage.getItem("hofs");
    if (storedHOFs !== null) {
        const hofs: { [game: string]: number } = JSON.parse(storedHOFs);
        if (game in hofs) {
            return hofs[game];
        }
    }
    return 0;
};

// Setters
export const setPB = (run: Run, battle: string): void => {
    const storedPBs: string | null = localStorage.getItem("pbs");
    const pbs: { [game: string]: string } = storedPBs ? JSON.parse(storedPBs) : {};
    if (run.gameSlug in pbs) {
        const segments: string[] = getSegments(run)
            .filter((segment: Segment) => segment.type === "battle")
            .map((segment: Segment) => segment.slug);
        const prevIdx: number = segments.indexOf(pbs[run.gameSlug]);
        if (segments.indexOf(battle) > prevIdx) {
            pbs[run.gameSlug] = battle;
        }
    } else {
        pbs[run.gameSlug] = battle;
    }
    localStorage.setItem("pbs", JSON.stringify(pbs));
};

// Mutators
export const incrementNumAttempts = (game: string): void => {
    const storedAttempts: string | null = localStorage.getItem("attempts");
    const attempts: { [game: string]: number } = storedAttempts ? JSON.parse(storedAttempts) : {};
    if (game in attempts) {
        attempts[game]++;
    } else {
        attempts[game] = 1;
    }
    localStorage.setItem("attempts", JSON.stringify(attempts));
};

export const updateNumHOFs = (game: string, inc: number): void => {
    const storedHOFs: string | null = localStorage.getItem("hofs");
    const hofs: { [game: string]: number } = storedHOFs ? JSON.parse(storedHOFs) : {};
    if (game in hofs) {
        hofs[game] += inc;
    } else {
        hofs[game] = 1;
    }
    localStorage.setItem("hofs", JSON.stringify(hofs));
};
