import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { getGameData } from "@/utils/game";
import { getBox, getRIPs, isAlive } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import { getPokedexLink } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./SummaryHeader.module.scss";

type Props = {
    caughtPokemon: CaughtPokemon;
    pokemonData: PokemonData;
    run: Run;
    onUpdate: (nickname: string) => void;
};

const SummaryHeader: React.FC<Props> = (props: Props) => {
    // Component state
    const [nickname, setNickname] = useState<string>("");

    // Internal state
    const [prevID, setPrevID] = useState<string>("");
    const [nextID, setNextID] = useState<string>("");

    // Compute the name of the location the Pokemon was met at
    const getMetLocation = (): string => {
        return getSegment(
            props.run.gameSlug,
            props.caughtPokemon.locationSlug === "starter"
                ? getGameData(props.run.gameSlug).startingTownSlug
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

    // Get the previous pokemon ID
    const getAdjacentID = (offset: number): string => {
        const allPokemon: CaughtPokemon[] = getBox(props.run.id).concat(getRIPs(props.run.id));
        const idx: number = allPokemon.findIndex((pokemon: CaughtPokemon) => pokemon.id === props.caughtPokemon.id);
        if ((offset === 1 && idx + 1 < allPokemon.length) || (offset === -1 && idx - 1 >= 0)) {
            return allPokemon[idx + offset].id;
        } else {
            return "";
        }
    };

    // Set the level of the current Pokemon if it exists on component load
    useEffect((): void => {
        if (props.caughtPokemon) {
            handleChange(props.caughtPokemon.nickname);
            setPrevID(getAdjacentID(-1));
            setNextID(getAdjacentID(1));
        }
    }, [props.caughtPokemon]);

    return (
        <div className={styles["summary-header"]}>
            <nav className={styles.nav}>
                {prevID ? (
                    <Link href={`/runs/${props.run.id}/summary/${prevID}`}>
                        <a className={styles.link}>← Prev</a>
                    </Link>
                ) : (
                    <div />
                )}
                {nextID ? (
                    <Link href={`/runs/${props.run.id}/summary/${nextID}`}>
                        <a className={styles.link}>Next →</a>
                    </Link>
                ) : (
                    ""
                )}
            </nav>
            <div className={styles.pokemon}>
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
                            onBlur={() => props.onUpdate(nickname)}
                        />
                        <span id="hidden" className={styles.hidden}></span>
                        <p className={styles.text}>the&nbsp;</p>
                        <Link href={getPokedexLink(props.run.id, props.caughtPokemon.pokemon.slug)}>
                            <a className={`${styles.text} ${styles.pokedex}`}>{props.pokemonData.pokemon.name}</a>
                        </Link>
                    </div>
                    <p className={styles.text}>
                        Met at: <strong>{getMetLocation()}</strong>
                    </p>
                    <p className={styles.text}>
                        Status: <strong>{isAlive(props.run.id, props.caughtPokemon.id) ? "Alive" : "RIP'd"}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SummaryHeader;
