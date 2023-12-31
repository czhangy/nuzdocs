import Dropdown from "@/components/Global/Dropdown/Dropdown";
import AbilityData from "@/models/AbilityData";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonAbility from "@/models/PokemonAbility";
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
    game: string;
    onLevelUpdate: (level: number) => void;
    onAbilityUpdate: (num: number) => void;
    onNatureUpdate: (nature: string) => void;
};

const SummaryInfo: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [abilities, setAbilities] = useState<AbilityData[]>([]);

    // Component state
    const [level, setLevel] = useState<string>("");

    // Save level when clicked off or revert it if the input is invalid
    const handleBlur = (): void => {
        const levelNum: number = Number(level);
        if (!isNaN(levelNum) && levelNum > 0 && levelNum <= 100) {
            props.onLevelUpdate(levelNum);
        } else {
            setLevel(props.caughtPokemon.pokemon.level ? String(props.caughtPokemon.pokemon.level) : "");
        }
    };

    // Set the level of the current Pokemon if it exists on component load
    useEffect(() => {
        setLevel(props.caughtPokemon.pokemon.level ? String(props.caughtPokemon.pokemon.level) : "");
    }, [props.caughtPokemon]);

    // Fetch the ability data for the given Pokemon on component load
    useEffect(() => {
        if (props.pokemonData && props.game) {
            fetchAbilities(
                props.pokemonData.abilities.map((ability: PokemonAbility) => ability.slug),
                props.game
            ).then((abilities: AbilityData[]) => setAbilities(abilities));
        }
    }, [props.pokemonData, props.game]);

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
                            abilities.length > 0
                                ? abilities.find(
                                      (ability: AbilityData) =>
                                          props.pokemonData.abilities.find(
                                              (ability: PokemonAbility) =>
                                                  ability.slot === props.caughtPokemon.abilityNum
                                          )!.slug === ability.slug
                                  )!.name
                                : null
                        }
                        options={abilities.map((ability: AbilityData) => ability.name)}
                        onSelect={(name: string) =>
                            props.onAbilityUpdate(
                                props.pokemonData.abilities.find(
                                    (ability: PokemonAbility) =>
                                        ability.slug ===
                                        abilities.find((ability: AbilityData) => ability.name === name)!.slug
                                )!.slot
                            )
                        }
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
                        onSelect={(nature: string) => props.onNatureUpdate(nature)}
                        border={false}
                        minWidth={120}
                    />
                </div>
            </div>
        </div>
    );
};

export default SummaryInfo;
