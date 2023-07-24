import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./EncounterDisplay.module.scss";
import LocalName from "@/models/LocalName";
import { fetchPokemon } from "utils";
import PokemonData from "@/models/PokemonData";

type Props = {
    pokedex: LocalName[];
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

    // Set encounter display into fail state
    const handleFail = () => {
        setIsSelected(true);
        setSearchValue("Failed");
    };

    // Reset display state
    const handleReset = () => {
        setIsSelected(false);
        setSearchValue("");
        setEncounteredPokemon(null);
    };

    // Toggle minimization state
    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // Delay close on blur to allow clicks to register
    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 100);
    };

    // Update state based on menu selection
    const handleSelect = async (pokemon: LocalName) => {
        setIsSelected(true);
        setSearchValue(pokemon.name);
        setEncounteredPokemon(await fetchPokemon(pokemon.slug));
    };

    // Search for matches in dex
    useEffect(() => {
        if (searchValue.length > 2) {
            let newMatches: LocalName[] = [];
            props.pokedex.forEach((pokemon: LocalName) => {
                if (pokemon.name.toLowerCase().includes(searchValue.toLowerCase())) {
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
                                <button className={styles["encounter-button"]} onClick={handleReset}>
                                    <Image
                                        src="/assets/icons/reset.svg"
                                        alt="Reset encounter"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </button>
                            ) : (
                                <button className={styles["encounter-button"]} onClick={handleFail}>
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
                                        <button className={styles.match} onClick={() => handleSelect(match)}>
                                            {match.name}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {isFocused ? (
                        ""
                    ) : (
                        <button className={styles["display-button"]} onClick={toggleMinimize}>
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
