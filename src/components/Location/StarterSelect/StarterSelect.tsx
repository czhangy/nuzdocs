import PokemonDisplay from "@/components/Run/PokemonDisplay/PokemonDisplay";
import TierCard from "@/components/Run/TierCard/TierCard";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import colors from "@/static/colors";
import { fetchPokemonList } from "@/utils/api";
import { getGame, getGameGroup } from "@/utils/game";
import { initCaughtPokemon, initPokemon } from "@/utils/initializers";
import {
    addToBox,
    addToCaughtPokemonSlugs,
    getStarterID,
    getStarterSlug,
    removeFromBox,
    removeFromCaughtPokemonSlugs,
    removeFromRIPs,
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
            fetchPokemonList(getGameGroup(props.run.gameSlug).starterSlugs, props.run.gameSlug).then(
                (starterData: PokemonData[]) => {
                    const starterSlug: string = getStarterSlug(props.run.id);
                    setStarters(starterData);
                    setSelectedStarter(
                        starterSlug
                            ? starterData.find((starter: PokemonData) => starter.pokemon.slug === starterSlug)!
                            : starterData[0]
                    );
                }
            );
        }
    }, [props.run]);

    // Place starter in box and remove existing starter on starter change + set run's starter
    useEffect(() => {
        if (props.run && selectedStarter) {
            if (selectedStarter.pokemon.slug !== getStarterSlug(props.run.id)) {
                const starterID: string = getStarterID(props.run.id);
                removeFromCaughtPokemonSlugs(props.run.id, starterID);
                removeFromBox(props.run.id, starterID);
                removeFromRIPs(props.run.id, starterID);
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
    }, [props.run, selectedStarter]);

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
                <PokemonDisplay pokemon={selectedStarter} runID={props.run.id} />
                <TierCard tier={getPokemonTier(selectedStarter.pokemon.slug, props.run.gameSlug)} />
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default StarterSelect;
