import PokemonDisplay from "@/components/Global/PokemonDisplay/PokemonDisplay";
import TierCard from "@/components/Global/TierCard/TierCard";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import colors from "@/static/colors";
import { fetchPokemonGroup } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { initCaughtPokemon, initPokemon } from "@/utils/initializers";
import {
    addToBox,
    addToCaughtPokemonSlugs,
    removeFromBox,
    removeFromCaughtPokemonSlugs,
    setStarterSlug,
} from "@/utils/run";
import { capitalizeWord, getPokemonTier } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./StarterSelect.module.scss";

type Props = {
    run: Run;
};

const StarterSelect: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [starters, setStarters] = useState<PokemonData[]>([]);

    // Component state
    const [selectedStarter, setSelectedStarter] = useState<PokemonData | null>(null);

    // Fetch starter data on load
    useEffect(() => {
        if (props.run) {
            fetchPokemonGroup(getGameGroup(props.run.gameSlug).starterSlugs, props.run.gameSlug).then(
                (starterData: PokemonData[]) => {
                    setStarters(starterData);
                    setSelectedStarter(
                        props.run.starterSlug === ""
                            ? starterData[0]
                            : starterData.find(
                                  (starter: PokemonData) => starter.pokemon.slug === props.run.starterSlug
                              )!
                    );
                }
            );
        }
    }, [props.run]);

    // Place starter in box and remove existing starter on starter change + set run's starter
    useEffect(() => {
        if (selectedStarter) {
            if (selectedStarter.pokemon.slug !== props.run.starterSlug) {
                removeFromBox(props.run.id, "starter");
                removeFromCaughtPokemonSlugs(props.run.id, "starter");
                setStarterSlug(props.run.id, selectedStarter.pokemon.slug);
                addToBox(
                    props.run.id,
                    initCaughtPokemon(
                        initPokemon(selectedStarter.pokemon.slug, selectedStarter.pokemon.species),
                        "starter",
                        props.run.id
                    )
                );
                addToCaughtPokemonSlugs(props.run.id, selectedStarter.pokemon.slug);
            }
        }
    }, [selectedStarter]);

    return selectedStarter ? (
        <div className={styles["starter-select"]}>
            <div className={styles.header}>
                <h3 className={styles.title}>Starter:</h3>
                <ul className={styles["type-select"]}>
                    {starters.map((starter: PokemonData) => {
                        return (
                            <li key={starter.pokemon.slug}>
                                <button
                                    className={styles.button}
                                    style={
                                        starter.pokemon.slug === selectedStarter.pokemon.slug
                                            ? {
                                                  backgroundColor: colors.types[starter.types[0]],
                                                  pointerEvents: "none",
                                              }
                                            : {}
                                    }
                                    onClick={() => setSelectedStarter(starter)}
                                >
                                    <div className={styles.icon}>
                                        <Image
                                            src={`/assets/types/${starter.types[0]}.svg`}
                                            alt={capitalizeWord(starter.types[0])}
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
            <div className={styles.starter}>
                <PokemonDisplay pokemon={selectedStarter} run={props.run} />
                <TierCard tier={getPokemonTier(selectedStarter.pokemon.slug, props.run.gameSlug)} />
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default StarterSelect;
