import Dropdown from "@/components/Global/Dropdown/Dropdown";
import AbilityData from "@/models/AbilityData";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { fetchAbilities } from "@/utils/api";
import { getListOfNatures } from "@/utils/natures";
import { getTypeCardSrc } from "@/utils/utils";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./SummaryInfo.module.scss";

type Props = {
    caughtPokemon: CaughtPokemon;
    pokemonData: PokemonData;
    onUpdate: (selection: string | number, property: string) => void;
};

const SummaryInfo: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [abilityData, setAbilityData] = useState<AbilityData[]>([]);

    // Component state
    const [level, setLevel] = useState<string>("");

    // Save level when clicked off or revert it if the input is invalid
    const handleBlur = (): void => {
        const levelNum: number = Number(level);
        if (!isNaN(levelNum) && levelNum > 0 && levelNum <= 100) {
            props.onUpdate(levelNum, "level");
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
                    {props.pokemonData.types.map((type: string) => {
                        return (
                            <div className={styles.type} key={type}>
                                <Image src={getTypeCardSrc(type)} alt={type} layout="fill" objectFit="contain" />
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
                        onSelect={(label: string) => props.onUpdate(getAbilitySlug(label), "abilitySlug")}
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
                        onSelect={(label: string) => props.onUpdate(label, "nature")}
                        border={false}
                        minWidth={120}
                    />
                </div>
            </div>
        </div>
    );
};

export default SummaryInfo;
