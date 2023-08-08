import TierCard from "@/components/Global/TierCard/TierCard";
import PokemonDisplay from "@/components/PokemonDisplay/PokemonDisplay";
import CaughtPokemon from "@/models/CaughtPokemon";
import GameGroup from "@/models/GameGroup";
import PokemonData from "@/models/PokemonData";
import colors from "@/static/colors";
import { fetchPokemonGroup } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { initCaughtPokemon, initPokemon } from "@/utils/initializers";
import {
    addToBox,
    addToCaughtPokemonSlugs,
    getLocationEncounter,
    getRun,
    removeFromBox,
    removeFromCaughtPokemonSlugs,
    setStarterSlug,
} from "@/utils/run";
import { getPokemonTier } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
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
        if (props.starterSlugsList.length > 0) {
            fetchPokemonGroup(props.starterSlugsList, getGameGroup(getRun(props.runName).gameSlug)).then((pokemon) =>
                setStarters(pokemon)
            );
        }
    }, [props.starterSlugsList]);

    // Persist starter selection on subsequent loads
    useEffect(() => {
        if (starters.length > 0) {
            const starterSlug: string = getRun(props.runName).starterSlug;
            if (starterSlug === "") {
                setSelectedStarterSlug(props.starterSlugsList[0]);
            } else {
                setSelectedStarterSlug(starterSlug);
            }
        }
    }, [starters]);

    // Place starter in box and remove existing starter on starter change + set run's starter
    useEffect(() => {
        if (selectedStarterSlug.length > 0) {
            const prevStarter: CaughtPokemon | null = getLocationEncounter(props.runName, "starter");
            if (prevStarter && prevStarter.pastSlugs[0] !== selectedStarterSlug) {
                removeFromBox(props.runName, "starter");
                removeFromCaughtPokemonSlugs(props.runName, prevStarter.pokemon.slug);
            }
            if (!prevStarter || prevStarter.pastSlugs[0] !== selectedStarterSlug) {
                setStarterSlug(props.runName, selectedStarterSlug);
                addToBox(
                    props.runName,
                    initCaughtPokemon(initPokemon(selectedStarterSlug, selectedStarterSlug), "starter", props.runName)
                );
                addToCaughtPokemonSlugs(props.runName, selectedStarterSlug);
            }
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
                    <PokemonDisplay pokemonSlug={selectedStarterSlug} runName={props.runName} />
                    <TierCard tier={getPokemonTier(selectedStarterSlug, props.gameGroup.versionGroup)} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default StarterSelect;
