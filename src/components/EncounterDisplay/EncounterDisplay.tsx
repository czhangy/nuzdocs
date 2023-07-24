import PokemonData from "@/models/PokemonData";
import Image from "next/image";
import { useState } from "react";
import styles from "./EncounterDisplay.module.scss";

type Props = {
    encounteredPokemon: PokemonData | null | "failed";
    uniquePokemonDataList: PokemonData[];
    onSelect: (pokemonName: string) => void;
};

const EncounterDisplay: React.FC<Props> = (props: Props) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    // Set encounter display into fail state
    const handleFail = () => {
        setIsSelected(true);
        setSearchValue("Failed");
    };

    // Reset display state
    const handleReset = () => {
        setIsSelected(false);
        setSearchValue("");
    };

    return (
        <>
            <div className={`${styles["encounter-display"]} ${isFocused ? styles.focused : ""}`}>
                <div className={`${styles.display}`}>
                    <div className={styles.sprite}>
                        <div className={styles["ball-bg"]} />
                        <hr className={styles["ball-divider"]} />
                        <div className={styles["ball-center"]} />
                    </div>
                    <div className={styles.text}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>Encounter:</h3>
                            {isSelected ? (
                                <button className={styles.button} onClick={handleReset}>
                                    <Image
                                        src="/assets/icons/reset.svg"
                                        alt="Reset encounter"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </button>
                            ) : (
                                <button className={styles.button} onClick={handleFail}>
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
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                </div>
            </div>
            <div className={`${styles.overlay} ${isFocused ? styles.show : ""}`} />
        </>
    );
};

export default EncounterDisplay;
