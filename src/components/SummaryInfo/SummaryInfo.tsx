import AbilityData from "@/models/AbilityData";
import CaughtPokemon from "@/models/CaughtPokemon";
import { fetchAbility } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SummaryInfo.module.scss";
import Dropdown from "@/components/Dropdown/Dropdown";
import { getListOfNatures } from "@/utils/natures";
import { getBox, getRIPs, isAlive, updateBox, updateRIPs } from "@/utils/run";

type Props = {
    pokemon: CaughtPokemon;
    types: string[];
    runName: string;
    onUpdate: () => void;
};

const SummaryInfo: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [ability, setAbility] = useState<AbilityData | null>(null);

    // Save CaughtPokemon data to local storage
    const handleUpdate = (selection: string, property: string) => {
        props.pokemon.pokemon.nature = selection;
        if (isAlive(props.runName, props.pokemon.nickname)) {
            const updateIdx: number = getBox(props.runName)
                .map((caughtPokemon: CaughtPokemon) => caughtPokemon.nickname)
                .indexOf(props.pokemon.nickname);
            updateBox(props.runName, props.pokemon, updateIdx);
        } else {
            const updateIdx: number = getRIPs(props.runName)
                .map((caughtPokemon: CaughtPokemon) => caughtPokemon.nickname)
                .indexOf(props.pokemon.nickname);
            updateRIPs(props.runName, props.pokemon, updateIdx);
        }
        props.onUpdate();
    };

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
                    <Dropdown
                        placeholder="???"
                        value={props.pokemon.pokemon.nature ? props.pokemon.pokemon.nature : null}
                        options={getListOfNatures()}
                        onSelect={(label: string) => handleUpdate(label, "nature")}
                        border={false}
                        minWidth={120}
                    />
                </div>
            </div>
        </div>
    );
};

export default SummaryInfo;
