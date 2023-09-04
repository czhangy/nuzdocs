import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import PokemonName from "@/models/PokemonName";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { fetchPokemon } from "@/utils/api";
import { getGameData } from "@/utils/game";
import { initCaughtPokemon, initPokemon } from "@/utils/initializers";
import {
    addToBox,
    addToCaughtPokemonSlugs,
    getLocationEncounter,
    getStatus,
    removeFromBox,
    removeFromCaughtPokemonSlugs,
    removeFromRIPs,
    setEncounterStatus,
} from "@/utils/run";
import { isCustom } from "@/utils/segment";
import Image from "next/image";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import styles from "./EncounterDisplay.module.scss";

type Props = {
    location: Segment;
    run: Run;
};

const EncounterDisplay: React.FC<Props> = (props: Props) => {
    // Input states
    const [value, setValue] = useState<string>("");
    const [matches, setMatches] = useState<PokemonName[]>([]);

    // Component states
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);

    // Fetched state
    const [encounteredPokemon, setEncounteredPokemon] = useState<PokemonData | null>(null);

    // Delay close on blur to allow clicks to register
    const handleBlur = () => setTimeout(() => setIsFocused(false), 100);

    // Highlight matching substring
    const renderMatch = (name: string): ReactElement => {
        const idx: number = name.toLowerCase().indexOf(value.toLowerCase());
        return (
            <p>
                {name.substring(0, idx)}
                <span className={styles.highlight}>{name.substring(idx, idx + value.length)}</span>
                {name.substring(idx + value.length, name.length)}
            </p>
        );
    };

    // Update display on reloads
    const updateDisplay = (selected: boolean, value: string): void => {
        setIsLocked(selected);
        setValue(value);
    };

    // Handles the catching of a Pokemon
    const handleCatch = async (pokemon: PokemonName): Promise<void> => {
        updateDisplay(true, pokemon.name);
        addToBox(
            props.run.id,
            initCaughtPokemon(initPokemon(pokemon.slug, pokemon.species), props.location.slug, props.run.id)
        );
        addToCaughtPokemonSlugs(props.run.id, pokemon.slug);
        setEncounteredPokemon(await fetchPokemon(pokemon.slug, props.run.gameSlug));
        setEncounterStatus(props.run.id, props.location.slug, "Caught");
    };

    // Handles resetting of encounter
    const handleReset = (): void => {
        updateDisplay(false, "");
        setEncounteredPokemon(null);
        const status: string = getStatus(props.run.id, props.location.slug);
        if (status === "Caught") {
            const pokemon: CaughtPokemon = getLocationEncounter(props.run.id, props.location.slug)!;
            removeFromCaughtPokemonSlugs(props.run.id, pokemon.id);
            removeFromBox(props.run.id, pokemon.id);
            removeFromRIPs(props.run.id, pokemon.id);
        }
        setEncounterStatus(props.run.id, props.location.slug, "None");
    };

    // Handles complex statuses
    const handleStatus = (status: "Failed" | "Delay" | "Skip"): void => {
        updateDisplay(true, status);
        setEncounterStatus(props.run.id, props.location.slug, status);
    };

    // Fetch saved encounter if it exists + update display on page change
    useEffect(() => {
        if (props.location !== undefined && props.run !== undefined) {
            updateDisplay(false, "");
            setEncounteredPokemon(null);
            if (!isCustom(props.location)) {
                const status: string = getStatus(props.run.id, props.location.slug);
                if (status === "Caught") {
                    updateDisplay(true, "");
                    const currentEncounter: CaughtPokemon = getLocationEncounter(props.run.id, props.location.slug);
                    fetchPokemon(currentEncounter.pastSlugs[0], props.run.gameSlug).then((pokemon: PokemonData) => {
                        updateDisplay(true, pokemon.pokemon.name);
                        setEncounteredPokemon(pokemon);
                    });
                } else {
                    updateDisplay(status !== "None", status === "None" ? "" : status);
                }
            }
        }
    }, [props.location, props.run]);

    // Search for matches in dex when typing in input
    useEffect(() => {
        if (props.run && !isLocked && value.length > 2) {
            const newMatches: PokemonName[] = [];
            getGameData(props.run.gameSlug).pokedex.forEach((pokemon: PokemonName) => {
                if (
                    pokemon.name.toLowerCase().includes(value.toLowerCase()) &&
                    (!props.run.options.dupes || !props.run.caughtPokemonSlugs.includes(pokemon.slug))
                ) {
                    newMatches.push(pokemon);
                }
            });
            setMatches(newMatches);
        } else {
            setMatches([]);
        }
    }, [props.run, isLocked, value]);

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
                            {isLocked ? (
                                <button
                                    className={`${styles["encounter-button"]} disable-select`}
                                    onClick={handleReset}
                                >
                                    <Image
                                        src="/assets/icons/reset.svg"
                                        alt="Reset encounter"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                        <input
                            className={styles.search}
                            disabled={isLocked}
                            type="text"
                            placeholder="Search..."
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                            value={value}
                            onFocus={() => setIsFocused(true)}
                            onBlur={handleBlur}
                            spellCheck={false}
                        />
                        {isFocused ? (
                            value.length === 0 ? (
                                <ul className={styles.matches}>
                                    <li>
                                        <button className={styles.match} onClick={() => handleStatus("Failed")}>
                                            Failed
                                        </button>
                                    </li>
                                    <li>
                                        <button className={styles.match} onClick={() => handleStatus("Delay")}>
                                            Delay
                                        </button>
                                    </li>
                                    <li>
                                        <button className={styles.match} onClick={() => handleStatus("Skip")}>
                                            Skip
                                        </button>
                                    </li>
                                </ul>
                            ) : (
                                <ul className={`${styles.matches} ${matches.length === 0 ? styles.hide : ""}`}>
                                    {matches.map((match: PokemonName) => {
                                        return (
                                            <li key={match.slug}>
                                                <button className={styles.match} onClick={() => handleCatch(match)}>
                                                    {renderMatch(match.name)}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )
                        ) : (
                            ""
                        )}
                    </div>
                    <button className={styles.toggle} onClick={() => setIsMinimized(!isMinimized)}>
                        {isMinimized ? "+" : "-"}
                    </button>
                </div>
            </div>
            <div className={`${styles.overlay} ${isFocused ? styles.show : ""}`} />
        </>
    );
};

export default EncounterDisplay;
