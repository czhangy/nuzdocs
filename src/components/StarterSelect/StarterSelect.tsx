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
    const [selectedStarter, setSelectedStarter] = useState<PokemonData | null>(null);

    // Fetch starter data on load
    useEffect(() => {
        fetchPokemonGroup(props.starterSlugsList).then((pokemon) => setStarters(pokemon));
    }, [props.starterSlugsList]);

    // Persist starter selection on subsequent loads
    useEffect(() => {
        if (starters.length > 0) {
            const run: Run = getRun(props.runName);
            if (run.starterSlug === "") {
                setSelectedStarter(starters[0]);
            } else {
                setSelectedStarter(
                    starters.filter((starter: PokemonData) => starter.pokemon.slug === run.starterSlug)[0]
                );
            }
        }
    }, [starters]);

    // Place starter in box and remove existing starter on starter change + set run's starter
    useEffect(() => {
        if (selectedStarter) {
            const slug: string = selectedStarter.pokemon.slug;
            const run: Run = getRun(props.runName);
            run.starterSlug = slug;
            for (let i = 0; i < run.encounterList.length; i++) {
                if (run.encounterList[i].locationSlug === "starter") {
                    run.encounterList.splice(i, 1);
                    break;
                }
            }
            const starter: CaughtPokemon = initCaughtPokemon(initPokemon(slug, 5), "starter");
            run.encounterList.push(starter);
            run.caughtPokemonSlugsList.push(slug);
            localStorage.setItem(props.runName, JSON.stringify(run));
        }
    }, [selectedStarter]);

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
                                        selectedStarter && starter === selectedStarter
                                            ? {
                                                  backgroundColor: colors.types[selectedStarter.types[0]],
                                                  pointerEvents: "none",
                                              }
                                            : {}
                                    }
                                    onClick={() => setSelectedStarter(starter)}
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
            {selectedStarter ? (
                <div className={styles.starter}>
                    <div className={styles.sprite}>
                        <Image
                            src={selectedStarter.sprite}
                            alt={selectedStarter.pokemon.name}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.top}>
                            <p className={styles.name}>{selectedStarter.pokemon.name}</p>
                            <TierCard
                                tier={getPokemonTier(selectedStarter.pokemon.slug, props.gameGroup.versionGroup)}
                            />
                        </div>
                        <ul className={styles.types}>
                            {selectedStarter.types.map((type: string, key: number) => {
                                return (
                                    <div className={styles.type} key={key}>
                                        <Image
                                            src={`https://www.serebii.net/pokedex-bw/type/${type}.gif`}
                                            alt={type}
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default StarterSelect;
