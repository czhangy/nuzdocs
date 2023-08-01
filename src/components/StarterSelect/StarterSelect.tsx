import PokemonDisplay from "@/components/PokemonDisplay/PokemonDisplay";
import CaughtPokemon from "@/models/CaughtPokemon";
import GameGroup from "@/models/GameGroup";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import colors from "@/static/colors";
import { fetchPokemonGroup } from "@/utils/api";
import { initCaughtPokemon, initPokemon } from "@/utils/initializers";
import { getPokemonTier, getRun } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import TierCard from "../TierCard/TierCard";
import styles from "./StarterSelect.module.scss";

type Props = {
    runName: string;
    starterSlugsList: string[];
    gameGroup: GameGroup;
};

const StarterSelect: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [starters, setStarters] = useState<PokemonData[]>([]);

    // User data state
    const [selectedStarterSlug, setSelectedStarterSlug] = useState<string>("");

    // Fetch starter data on load
    useEffect(() => {
        fetchPokemonGroup(props.starterSlugsList).then((pokemon) => setStarters(pokemon));
    }, [props.starterSlugsList]);

    // Persist starter selection on subsequent loads
    useEffect(() => {
        if (starters.length > 0) {
            const run: Run = getRun(props.runName);
            if (run.starterSlug === "") {
                setSelectedStarterSlug(props.starterSlugsList[0]);
            } else {
                setSelectedStarterSlug(run.starterSlug);
            }
        }
    }, [starters]);

    // Place starter in box and remove existing starter on starter change + set run's starter
    useEffect(() => {
        if (selectedStarterSlug.length > 0) {
            const run: Run = getRun(props.runName);
            run.starterSlug = selectedStarterSlug;
            for (let i = 0; i < run.encounterList.length; i++) {
                if (run.encounterList[i].locationSlug === "starter") {
                    run.encounterList.splice(i, 1);
                    break;
                }
            }
            const starter: CaughtPokemon = initCaughtPokemon(initPokemon(selectedStarterSlug, 5), "starter");
            run.encounterList.push(starter);
            localStorage.setItem(props.runName, JSON.stringify(run));
        }
    }, [selectedStarterSlug]);

    return (
        <div className={styles["starter-select"]}>
            <div className={styles.header}>
                <h3 className={styles.title}>Starter:</h3>
                <ul className={styles["type-select"]}>
                    {starters.map((starter: PokemonData, key: number) => {
                        return (
                            <li key={key}>
                                <button
                                    className={styles.button}
                                    style={
                                        starter.pokemon.slug === selectedStarterSlug
                                            ? {
                                                  backgroundColor: colors.types[starter.types[0]],
                                                  pointerEvents: "none",
                                              }
                                            : {}
                                    }
                                    onClick={() => setSelectedStarterSlug(starter.pokemon.slug)}
                                >
                                    <div className={styles.icon}>
                                        <Image
                                            src={`/assets/types/${starter.types[0]}.svg`}
                                            alt={starter.types[0]}
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {selectedStarterSlug.length > 0 ? (
                <div className={styles.starter}>
                    <PokemonDisplay pokemonSlug={selectedStarterSlug} />
                    <TierCard tier={getPokemonTier(selectedStarterSlug, props.gameGroup.versionGroup)} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default StarterSelect;
