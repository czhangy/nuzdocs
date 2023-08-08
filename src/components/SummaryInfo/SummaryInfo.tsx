import Dropdown from "@/components/Dropdown/Dropdown";
import AbilityData from "@/models/AbilityData";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { fetchAbilities, fetchAbility } from "@/utils/api";
import { getListOfNatures } from "@/utils/natures";
import { getBox, getRIPs, isAlive, updateBox, updateRIPs } from "@/utils/run";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./SummaryInfo.module.scss";

type Props = {
    caughtPokemon: CaughtPokemon;
    pokemonData: PokemonData;
    runName: string;
    onUpdate: () => void;
};

const SummaryInfo: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [abilityData, setAbilityData] = useState<AbilityData[]>([]);

    // Internal data state
    const [level, setLevel] = useState<string>("");

    // Save level when clicked off
    const handleBlur = () => {
        const levelNum: number = Number(level);
        if (!isNaN(levelNum) && levelNum > 0 && levelNum <= 100) {
            handleUpdate(levelNum, "level");
        } else {
            setLevel(props.caughtPokemon.pokemon.level ? String(props.caughtPokemon.pokemon.level) : "");
        }
    };

    // Get the names of all abilities
    const getAbilityNames = (): string[] => {
        return abilityData.map((ability: AbilityData) => ability.name);
    };

    // Convert an ability name to slug
    const getAbilitySlug = (name: string): string => {
        return abilityData.find((ability: AbilityData) => ability.name === name)!.slug;
    };

    // Convert an ability slug to name
    const getAbilityName = (slug: string): string => {
        return abilityData.find((ability: AbilityData) => ability.slug === slug)!.name;
    };

    // Save CaughtPokemon data to local storage
    const handleUpdate = (selection: string | number, property: string) => {
        // @ts-expect-error
        props.caughtPokemon.pokemon[property] = selection;
        if (isAlive(props.runName, props.caughtPokemon.nickname)) {
            const updateIdx: number = getBox(props.runName)
                .map((cp: CaughtPokemon) => cp.nickname)
                .indexOf(props.caughtPokemon.nickname);
            updateBox(props.runName, props.caughtPokemon, updateIdx);
        } else {
            const updateIdx: number = getRIPs(props.runName)
                .map((cp: CaughtPokemon) => cp.nickname)
                .indexOf(props.caughtPokemon.nickname);
            updateRIPs(props.runName, props.caughtPokemon, updateIdx);
        }
        props.onUpdate();
    };

    // Set the level of the current Pokemon if it exists on component load
    useEffect(() => {
        if (props.caughtPokemon.pokemon.level) setLevel(String(props.caughtPokemon.pokemon.level));
    }, [props.caughtPokemon]);

    // Fetch the ability data for the given Pokemon on component load
    useEffect(() => {
        if (props.pokemonData) {
            fetchAbilities(props.pokemonData.abilities).then((abilities: AbilityData[]) => setAbilityData(abilities));
        }
    }, [props.pokemonData]);

    return (
        <div className={styles["summary-info"]}>
            <div className={styles.card}>
                <p className={styles.header}>Typing</p>
                <div className={styles.value}>
                    {props.pokemonData.types.map((type: string, key: number) => {
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
                    <input
                        className={styles.level}
                        type="number"
                        min="1"
                        max="100"
                        placeholder="???"
                        value={level}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setLevel(e.target.value)}
                        onBlur={handleBlur}
                    />
                </div>
            </div>
            <div className={styles.card}>
                <p className={styles.header}>Ability</p>
                <div className={styles.value}>
                    <Dropdown
                        placeholder="???"
                        value={
                            abilityData.length > 0 && props.caughtPokemon.pokemon.abilitySlug
                                ? getAbilityName(props.caughtPokemon.pokemon.abilitySlug)
                                : null
                        }
                        options={getAbilityNames()}
                        onSelect={(label: string) => handleUpdate(getAbilitySlug(label), "abilitySlug")}
                        border={false}
                        minWidth={150}
                    />
                </div>
            </div>
            <div className={styles.card}>
                <p className={styles.header}>Nature</p>
                <div className={styles.value}>
                    <Dropdown
                        placeholder="???"
                        value={props.caughtPokemon.pokemon.nature ? props.caughtPokemon.pokemon.nature : null}
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
