import BoxMenu from "@/components/Run/BoxMenu/BoxMenu";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { fetchPokemonList } from "@/utils/api";
import { getPokemonSlugsFromBox } from "@/utils/run";
import { exportPokemon } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Box.module.scss";

type Props = {
    box: CaughtPokemon[];
    run: Run;
    onEvolve?: (pokemon: PokemonData, idx: number) => void;
    onFormChange?: (pokemon: PokemonData, idx: number) => void;
    onRIP?: (pokemon: PokemonData, idx: number) => void;
    onRevive?: (pokemon: PokemonData, idx: number) => void;
};

const Box: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [boxData, setBoxData] = useState<PokemonData[]>([]);

    // Component state
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    // Internal data state
    const [isInverted, setIsInverted] = useState<boolean[]>([]);

    // Compute inverted indices for menu display
    const getInvertedMenus = () => {
        const pokemon: HTMLCollectionOf<Element> = document.getElementsByClassName(styles.pokemon);
        const inverted: boolean[] = [];
        for (const p of pokemon) {
            inverted.push(p.getBoundingClientRect().right > window.innerWidth / 2);
        }
        setIsInverted(inverted);
    };

    // Close menu and propagate up
    const handleEvolve = (pokemon: PokemonData, idx: number): void => {
        setActiveIdx(null);
        props.onEvolve!(pokemon, idx);
    };

    // Close menu and propagate up
    const handleFormChange = (pokemon: PokemonData, idx: number): void => {
        setActiveIdx(null);
        props.onFormChange!(pokemon, idx);
    };

    // Close menu and propagate up
    const handleRIP = (pokemon: PokemonData, idx: number): void => {
        setActiveIdx(null);
        props.onRIP!(pokemon, idx);
    };

    // Close menu and propagate up
    const handleRevive = (pokemon: PokemonData, idx: number): void => {
        setActiveIdx(null);
        props.onRevive!(pokemon, idx);
    };

    // Close menu and copy set to clipboard
    const handleExport = (pokemon: CaughtPokemon, name: string): void => {
        setActiveIdx(null);
        exportPokemon(pokemon.pokemon, name, pokemon.nickname);
    };

    // Compute the number of failed encounters
    const getNumFailedEncounters = (): number => {
        return props.box.filter((pokemon: CaughtPokemon) => pokemon.pokemon.slug === "failed").length;
    };

    // Listen for window resizes to recompute inverted menus on component load
    useEffect(() => {
        getInvertedMenus();
        window.addEventListener("resize", getInvertedMenus);
        return () => {
            window.removeEventListener("resize", getInvertedMenus);
        };
    }, []);

    // Use box to fetch data for all Pokemon in box, ignoring failed encounters
    useEffect(() => {
        if (props.box.length > 0) {
            fetchPokemonList(getPokemonSlugsFromBox(props.box), props.run.gameSlug).then((pokemonData: PokemonData[]) =>
                setBoxData(pokemonData)
            );
        }
    }, [props.box]);

    return boxData.length > 0 && boxData.length + getNumFailedEncounters() === props.box.length ? (
        <div className={styles.box}>
            {boxData.map((pokemon: PokemonData, idx: number) => (
                <div className={styles.pokemon} key={props.box[idx].id}>
                    <button
                        className={`${styles.button} ${idx === activeIdx ? styles.active : ""}`}
                        onClick={() => setActiveIdx(idx)}
                    >
                        <Image src={pokemon.sprite} alt={pokemon.pokemon.name} layout="fill" objectFit="contain" />
                    </button>
                    {props.onEvolve ? (
                        <BoxMenu
                            pokemon={pokemon}
                            pokemonID={props.box[idx].id}
                            runID={props.run.id}
                            open={idx === activeIdx}
                            inverted={isInverted[idx]}
                            onClose={() => setActiveIdx(null)}
                            onEvolve={() => handleEvolve(pokemon, idx)}
                            onFormChange={() => handleFormChange(pokemon, idx)}
                            onRIP={() => handleRIP(pokemon, idx)}
                            onExport={() => handleExport(props.box[idx], pokemon.pokemon.name)}
                        />
                    ) : (
                        <BoxMenu
                            pokemon={pokemon}
                            pokemonID={props.box[idx].id}
                            runID={props.run.id}
                            open={idx === activeIdx}
                            inverted={isInverted[idx]}
                            onClose={() => setActiveIdx(null)}
                            onRevive={() => handleRevive(pokemon, idx)}
                        />
                    )}
                </div>
            ))}
        </div>
    ) : (
        <p className={styles.text}>{props.onEvolve ? "No Pokémon left!" : "No RIPs yet!"}</p>
    );
};

export default Box;
