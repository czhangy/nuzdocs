import CaughtPokemon from "@/models/CaughtPokemon";
import LocalName from "@/models/LocalName";
import PokemonData from "@/models/PokemonData";
import { fetchPokemon } from "@/utils/api";
import {
    addCaughtPokemon,
    addEncounter,
    getCaughtPokemon,
    getEncounter,
    removeCaughtPokemon,
    removeEncounter,
} from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./EncounterDisplay.module.scss";

type Props = {
    pokedex: LocalName[];
    runName: string;
    locationSlug: string;
};

const EncounterDisplay: React.FC<Props> = (props: Props) => {
    // Input states
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [matches, setMatches] = useState<LocalName[]>([]);

    // Display states
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);

    // Encounter state
    const [encounteredPokemon, setEncounteredPokemon] = useState<PokemonData | null>(null);

    // Delay close on blur to allow clicks to register
    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 100);
    };

    // Highlight matching substring
    const renderMatch = (pokemonName: string) => {
        const matchIdx: number = pokemonName.toLowerCase().indexOf(searchValue.toLowerCase());
        return (
            <p>
                {pokemonName.substring(0, matchIdx)}
                <span className={styles.highlight}>
                    {pokemonName.substring(matchIdx, matchIdx + searchValue.length)}
                </span>
                {pokemonName.substring(matchIdx + searchValue.length, pokemonName.length)}
            </p>
        );
    };

    // Update display on reloads
    const handleDisplay = (selected: boolean, value: string) => {
        setIsSelected(selected);
        setSearchValue(value);
    };

    // Update display and local storage on select
    const handleUpdate = async (encounter: LocalName | null) => {
        if (encounter) {
            handleDisplay(true, encounter.name);
            addEncounter(props.runName, props.locationSlug, encounter.slug);
            if (encounter.slug !== "failed") {
                setEncounteredPokemon(await fetchPokemon(encounter.slug));
                addCaughtPokemon(props.runName, encounter.slug);
            }
        } else {
            handleDisplay(false, "");
            removeCaughtPokemon(props.runName, getEncounter(props.runName, props.locationSlug)!.pokemon.slug);
            removeEncounter(props.runName, props.locationSlug);
            setEncounteredPokemon(null);
        }
    };

    // Fetch saved encounter if it exists
    useEffect(() => {
        if (props.runName && props.locationSlug) {
            const currentEncounter: CaughtPokemon | null = getEncounter(props.runName, props.locationSlug);
            if (!currentEncounter) {
                handleDisplay(false, "");
                setEncounteredPokemon(null);
            } else if (currentEncounter.pokemon.slug === "failed") {
                handleDisplay(true, "Failed");
            } else {
                fetchPokemon(currentEncounter.pokemon.slug).then((pokemon: PokemonData) => {
                    handleDisplay(true, pokemon.pokemon.name);
                    setEncounteredPokemon(pokemon);
                });
            }
        }
    }, [props.runName, props.locationSlug]);

    // Search for matches in dex when typing in input
    useEffect(() => {
        if (searchValue.length > 2 && !isSelected) {
            let newMatches: LocalName[] = [];
            props.pokedex.forEach((pokemon: LocalName) => {
                if (
                    pokemon.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                    !getCaughtPokemon(props.runName).includes(pokemon.slug)
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
                            {isSelected ? (
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
                                    onClick={() => handleUpdate({ slug: "failed", name: "Failed" })}
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
                            disabled={isSelected}
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            onFocus={() => setIsFocused(true)}
                            onBlur={handleBlur}
                            spellCheck={false}
                        />
                        <ul className={`${styles.matches} ${!isFocused || matches.length === 0 ? styles.hide : ""}`}>
                            {matches.map((match: LocalName, key: number) => {
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
