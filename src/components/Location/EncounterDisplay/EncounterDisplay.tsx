import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import PokemonName from "@/models/PokemonName";
import Run from "@/models/Run";
import { fetchPokemon } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { initCaughtPokemon, initPokemon } from "@/utils/initializers";
import {
    addFailedEncounter,
    addToBox,
    addToCaughtPokemonSlugs,
    getLocationEncounter,
    removeFromBox,
    removeFromCaughtPokemonSlugs,
    removeFromRIPs,
} from "@/utils/run";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./EncounterDisplay.module.scss";

type Props = {
    locationSlug: string;
    run: Run;
};

const EncounterDisplay: React.FC<Props> = (props: Props) => {
    // Input states
    const [searchValue, setSearchValue] = useState<string>("");
    const [matches, setMatches] = useState<PokemonName[]>([]);
    const [hasEncounter, setHasEncounter] = useState<boolean>(false);

    // Component states
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);

    // Fetched data state
    const [encounteredPokemon, setEncounteredPokemon] = useState<PokemonData | null>(null);

    // Delay close on blur to allow clicks to register
    const handleBlur = () => setTimeout(() => setIsFocused(false), 100);

    // Highlight matching substring
    const renderMatch = (name: string) => {
        const idx: number = name.toLowerCase().indexOf(searchValue.toLowerCase());
        return (
            <p>
                {name.substring(0, idx)}
                <span className={styles.highlight}>{name.substring(idx, idx + searchValue.length)}</span>
                {name.substring(idx + searchValue.length, name.length)}
            </p>
        );
    };

    // Update display on reloads
    const updateDisplay = (selected: boolean, value: string) => {
        setHasEncounter(selected);
        setSearchValue(value);
    };

    // Update display + local storage on select
    const handleUpdate = async (encounter: PokemonName | null) => {
        if (encounter) {
            updateDisplay(true, encounter.name);
            if (encounter.slug === "failed") {
                addFailedEncounter(props.run.id, props.locationSlug);
            } else {
                addToBox(
                    props.run.id,
                    initCaughtPokemon(initPokemon(encounter.slug, encounter.species), props.locationSlug, props.run.id)
                );
                addToCaughtPokemonSlugs(props.run.id, encounter.slug);
                setEncounteredPokemon(await fetchPokemon(encounter.slug, props.run.gameSlug));
            }
        } else {
            updateDisplay(false, "");
            setEncounteredPokemon(null);
            const caughtPokemon: CaughtPokemon = getLocationEncounter(props.run.id, props.locationSlug)!;
            removeFromCaughtPokemonSlugs(props.run.id, caughtPokemon.id);
            removeFromBox(props.run.id, caughtPokemon.id);
            removeFromRIPs(props.run.id, caughtPokemon.id);
        }
    };

    // Fetch saved encounter if it exists + update display on page change
    useEffect(() => {
        if (props.run && props.locationSlug) {
            updateDisplay(false, "");
            setEncounteredPokemon(null);
            const currentEncounter: CaughtPokemon | null = getLocationEncounter(props.run.id, props.locationSlug);
            if (currentEncounter) {
                if (currentEncounter.pokemon.slug === "failed") {
                    updateDisplay(true, "Failed");
                } else {
                    fetchPokemon(currentEncounter.pastSlugs[0], props.run.gameSlug).then((pokemon: PokemonData) => {
                        updateDisplay(true, pokemon.pokemon.name);
                        setEncounteredPokemon(pokemon);
                    });
                }
            }
        }
    }, [props.run, props.locationSlug]);

    // Search for matches in dex when typing in input
    useEffect(() => {
        if (!hasEncounter && searchValue.length > 2) {
            const newMatches: PokemonName[] = [];
            getGameGroup(props.run.gameSlug).pokedex.forEach((pokemon: PokemonName) => {
                if (
                    pokemon.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                    !props.run.caughtPokemonSlugs.includes(pokemon.slug)
                ) {
                    newMatches.push(pokemon);
                }
            });
            setMatches(newMatches);
        } else {
            setMatches([]);
        }
    }, [searchValue]);

    return (
        <>
            <div className={`${styles["encounter-display"]} ${isFocused ? styles.focused : ""}`}>
                <div className={`${styles.display} ${isMinimized ? styles.minimized : ""}`}>
                    <div className={styles.sprite}>
                        <div className={styles["ball-bg"]} />
                        <hr className={styles["ball-divider"]} />
                        <div className={styles["ball-center"]} />
                        {encounteredPokemon ? (
                            <Image
                                src={encounteredPokemon.sprite}
                                alt={encounteredPokemon.pokemon.name}
                                layout="fill"
                                objectFit="contain"
                            />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className={styles.text}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>Encounter:</h3>
                            {hasEncounter ? (
                                <button className={styles["encounter-button"]} onClick={() => handleUpdate(null)}>
                                    <Image
                                        src="/assets/icons/reset.svg"
                                        alt="Reset encounter"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </button>
                            ) : (
                                <button
                                    className={styles["encounter-button"]}
                                    onClick={() => handleUpdate({ slug: "failed", name: "Failed", species: "failed" })}
                                >
                                    <Image
                                        src="/assets/icons/x.svg"
                                        alt="Fail encounter"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </button>
                            )}
                        </div>
                        <input
                            className={styles.search}
                            disabled={hasEncounter}
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            onFocus={() => setIsFocused(true)}
                            onBlur={handleBlur}
                            spellCheck={false}
                        />
                        <ul className={`${styles.matches} ${!isFocused || matches.length === 0 ? styles.hide : ""}`}>
                            {matches.map((match: PokemonName, key: number) => {
                                return (
                                    <li key={key}>
                                        <button className={styles.match} onClick={() => handleUpdate(match)}>
                                            {renderMatch(match.name)}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {isFocused ? (
                        ""
                    ) : (
                        <button className={styles["display-button"]} onClick={() => setIsMinimized(!isMinimized)}>
                            {isMinimized ? "+" : "-"}
                        </button>
                    )}
                </div>
            </div>
            <div className={`${styles.overlay} ${isFocused ? styles.show : ""}`} />
        </>
    );
};

export default EncounterDisplay;
