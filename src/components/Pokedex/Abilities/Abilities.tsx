import AbilityData from "@/models/AbilityData";
import { fetchAbilities } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./Abilities.module.scss";

type Props = {
    abilities: string[];
    game: string;
};

const Abilities: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [abilities, setAbilities] = useState<AbilityData[]>([]);

    // Fetch abilities on component load
    useEffect(() => {
        if (props.abilities && props.game) {
            fetchAbilities(props.abilities, props.game).then((abilities: AbilityData[]) => setAbilities(abilities));
        }
    }, [props.abilities, props.game]);

    return (
        <div className={styles.abilities}>
            <div className={styles.header}>{props.abilities.length === 1 ? "Ability" : "Abilities"}</div>
            {abilities.length > 0 ? (
                <ul className={styles.list}>
                    {abilities.map((ability: AbilityData) => {
                        return (
                            <li className={styles.ability} key={ability.slug}>
                                <strong>{ability.name}</strong>: {ability.desc}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className={styles.loading}>
                    <div className="bg-spinner" />
                </div>
            )}
        </div>
    );
};

export default Abilities;
