import Run from "@/models/Run";
import OutdatedTrainer from "@/models/OutdatedTrainer";
import { getGameData } from "@/utils/game";
import Image from "next/image";
import styles from "./CharacterSelect.module.scss";
import { setCharacter } from "@/utils/run";
import { useEffect, useState } from "react";

type Props = {
    run: Run;
};

const CharacterSelect: React.FC<Props> = (props: Props) => {
    // Internal state
    const [selectedCharacter, setSelectedCharacter] = useState<string>("");

    // Propagate character selection to run data
    const handleSelect = (character: string): void => {
        setSelectedCharacter(character);
        setCharacter(props.run.id, character);
    };

    // Get run's selected character on component load
    useEffect(() => {
        if (props.run) {
            setSelectedCharacter(props.run.character);
        }
    }, [props.run]);

    return (
        <div className={styles["character-select"]}>
            <h3 className={styles.header}>Character:</h3>
            <div className={styles.characters}>
                {getGameData(props.run.gameSlug).characters.map((character: OutdatedTrainer) => {
                    return (
                        <button
                            className={`${styles.character} ${
                                character.name === selectedCharacter ? styles.active : ""
                            } disable-select`}
                            onClick={() => handleSelect(character.name!)}
                            key={character.name}
                        >
                            <Image src={character.sprite} alt={character.name} layout="fill" objectFit="contain" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CharacterSelect;
