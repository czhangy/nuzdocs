import { useEffect, useState } from "react";
import styles from "./AbilityList.module.scss";
import AbilityData from "@/models/AbilityData";
import { fetchAbilities } from "@/utils/api";

type Props = {
    abilities: string[];
    game: string;
};

const AbilityList: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [abilities, setAbilities] = useState<AbilityData[]>([]);

    // Fetch abilities on component load
    useEffect(() => {
        if (props.abilities) {
            fetchAbilities(props.abilities, props.game).then((abilities: AbilityData[]) => setAbilities(abilities));
        }
    }, [props.abilities]);

    return (
        <div className={styles["ability-list"]}>
            <div className={styles.header}>{props.abilities.length === 1 ? "Ability" : "Abilities"}</div>
            <ul className={styles.abilities}>
                {abilities.map((ability: AbilityData) => {
                    return (
                        <li className={styles.ability}>
                            <strong>{ability.name}</strong>: {ability.desc}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AbilityList;
