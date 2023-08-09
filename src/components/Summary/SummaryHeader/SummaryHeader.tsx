import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { getGameGroup } from "@/utils/game";
import { isAlive } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./SummaryHeader.module.scss";

type Props = {
    caughtPokemon: CaughtPokemon;
    pokemonData: PokemonData;
    run: Run;
    onUpdate: (selection: string | number, property: string, isNested: boolean) => void;
};

const SummaryHeader: React.FC<Props> = (props: Props) => {
    // Component state
    const [nickname, setNickname] = useState<string>("");

    // Compute the name of the location the Pokemon was met at
    const getMetLocation = (): string => {
        return getSegment(
            props.run.gameSlug,
            props.caughtPokemon.locationSlug === "starter"
                ? getGameGroup(props.run.gameSlug).startingTownSlug
                : props.caughtPokemon.locationSlug
        ).name;
    };

    // Update state and resize container on change
    const handleChange = (nickname: string): void => {
        const hidden: HTMLSpanElement = document.getElementById("hidden")!;
        const input: HTMLSpanElement = document.getElementById("nickname")!;
        if (nickname.length > 0) {
            hidden.innerHTML = nickname.replace(/\s/g, "&nbsp;");
        } else {
            hidden.innerHTML = props.caughtPokemon.pokemon.species;
        }
        input.style.width = 8 + hidden.offsetWidth + "px";
        setNickname(nickname);
    };

    // Save nickname on blur
    const handleBlur = (): void => {
        props.onUpdate(nickname, "nickname", false);
    };

    // Set the level of the current Pokemon if it exists on component load
    useEffect((): void => {
        if (props.caughtPokemon) {
            handleChange(props.caughtPokemon.nickname);
        }
    }, [props.caughtPokemon]);

    return (
        <div className={styles["summary-header"]}>
            <div className={styles.sprite}>
                <Image
                    src={props.pokemonData.sprite}
                    alt={props.pokemonData.pokemon.name}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className={styles.info}>
                <div className={styles.name}>
                    <input
                        id="nickname"
                        className={styles.nickname}
                        type="text"
                        value={nickname}
                        maxLength={12}
                        placeholder={props.caughtPokemon.pokemon.species}
                        spellCheck={false}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                    />
                    <span id="hidden" className={styles.hidden}></span>
                    <p className={styles.text}>the {props.pokemonData.pokemon.name}</p>
                </div>
                <p className={styles.text}>
                    Met at: <strong>{getMetLocation()}</strong>
                </p>
                <p className={styles.text}>
                    Status: <strong>{isAlive(props.run.id, props.caughtPokemon.id) ? "Alive" : "RIP'd"}</strong>
                </p>
            </div>
        </div>
    );
};

export default SummaryHeader;
