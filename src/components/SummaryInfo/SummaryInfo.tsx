import CaughtPokemon from "@/models/CaughtPokemon";
import styles from "./SummaryInfo.module.scss";
import { useEffect, useState } from "react";
import AbilityData from "@/models/AbilityData";
import { fetchAbility } from "@/utils/api";
import Image from "next/image";

type Props = {
    pokemon: CaughtPokemon;
    types: string[];
};

const SummaryInfo: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [ability, setAbility] = useState<AbilityData | null>(null);

    // Fetch the ability data for the given Pokemon on component load
    useEffect(() => {
        if (props.pokemon && props.pokemon.pokemon.abilitySlug) {
            fetchAbility(props.pokemon.pokemon.abilitySlug).then((ability: AbilityData) => setAbility(ability));
        }
    }, [props.pokemon]);

    return (
        <div className={styles["summary-info"]}>
            <div className={styles.card}>
                <p className={styles.header}>Typing</p>
                <div className={styles.value}>
                    {props.types.map((type: string, key: number) => {
                        return (
                            <div className={styles.type} key={key}>
                                <Image
                                    src={`https://www.serebii.net/pokedex-bw/type/${type}.gif`}
                                    alt={type}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles.card}>
                <p className={styles.header}>Level</p>
                <div className={styles.value}>
                    <p className={styles.text}>{props.pokemon.pokemon.level ? props.pokemon.pokemon.level : "???"}</p>
                </div>
            </div>
            <div className={styles.card}>
                <p className={styles.header}>Ability</p>
                <div className={styles.value}>
                    <p className={styles.text}>{ability ? ability.name : "???"}</p>
                </div>
            </div>
            <div className={styles.card}>
                <p className={styles.header}>Nature</p>
                <div className={styles.value}>
                    <p className={styles.text}>{props.pokemon.pokemon.nature ? props.pokemon.pokemon.nature : "???"}</p>
                </div>
            </div>
        </div>
    );
};

export default SummaryInfo;
