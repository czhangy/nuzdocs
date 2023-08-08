import TierCard from "@/components/TierCard/TierCard";
import AbilityData from "@/models/AbilityData";
import CaughtPokemon from "@/models/CaughtPokemon";
import { fetchAbility } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { getRun } from "@/utils/run";
import { getPokemonTier } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SummaryInfo.module.scss";

type Props = {
    pokemon: CaughtPokemon;
    types: string[];
    runName: string;
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
                <p className={styles.header}>Tier</p>
                <div className={styles.value}>
                    <p className={styles.text}>
                        <TierCard
                            tier={getPokemonTier(
                                props.pokemon.pokemon.species,
                                getGameGroup(getRun(props.runName).gameSlug).versionGroup
                            )}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SummaryInfo;
