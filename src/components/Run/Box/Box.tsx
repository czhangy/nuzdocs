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
    onEvolve?: (pokemon: PokemonData, id: string) => void;
    onFormChange?: (pokemon: PokemonData, id: string) => void;
    onRIP?: (pokemon: PokemonData, id: string) => void;
    onRevive?: (pokemon: PokemonData, id: string) => void;
};

const Box: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [boxPokemon, setBoxPokemon] = useState<CaughtPokemon[]>([]);
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
    const handleEvolve = (pokemon: PokemonData, id: string): void => {
        setActiveIdx(null);
        props.onEvolve!(pokemon, id);
    };

    // Close menu and propagate up
    const handleFormChange = (pokemon: PokemonData, id: string): void => {
        setActiveIdx(null);
        props.onFormChange!(pokemon, id);
    };

    // Close menu and propagate up
    const handleRIP = (pokemon: PokemonData, id: string): void => {
        setActiveIdx(null);
        props.onRIP!(pokemon, id);
    };

    // Close menu and propagate up
    const handleRevive = (pokemon: PokemonData, id: string): void => {
        setActiveIdx(null);
        props.onRevive!(pokemon, id);
    };

    // Close menu and copy set to clipboard
    const handleExport = (pokemon: CaughtPokemon, name: string): void => {
        setActiveIdx(null);
        exportPokemon(pokemon.pokemon, name, pokemon.nickname);
    };

    // Listen for window resizes to recompute inverted menus when component ready
    useEffect(() => {
        getInvertedMenus();
        window.addEventListener("resize", getInvertedMenus);
        return () => {
            window.removeEventListener("resize", getInvertedMenus);
        };
    }, [boxData]);

    // Use box to fetch data for all Pokemon in box, ignoring failed encounters
    useEffect(() => {
        if (props.box.length > 0 && props.run) {
            setBoxPokemon(props.box.filter((pokemon: CaughtPokemon) => pokemon.pokemon.slug !== "failed"));
            fetchPokemonList(getPokemonSlugsFromBox(props.box), props.run.gameSlug).then((pokemonData: PokemonData[]) =>
                setBoxData(pokemonData)
            );
        } else {
            setBoxPokemon([]);
            setBoxData([]);
        }
    }, [props.box, props.run]);

    return boxData.length > 0 && boxData.length === boxPokemon.length ? (
        <div className={styles.box}>
            {boxData.map((pokemon: PokemonData, idx: number) => (
                <div className={styles.pokemon} key={boxPokemon[idx].id}>
                    <button
                        className={`${styles.button} ${idx === activeIdx ? styles.active : ""}`}
                        onClick={() => setActiveIdx(idx)}
                    >
                        <Image src={pokemon.sprite} alt={pokemon.pokemon.name} layout="fill" objectFit="contain" />
                    </button>
                    {props.onEvolve ? (
                        <BoxMenu
                            pokemon={pokemon}
                            pokemonID={boxPokemon[idx].id}
                            runID={props.run.id}
                            open={idx === activeIdx}
                            inverted={isInverted[idx]}
                            onClose={() => setActiveIdx(null)}
                            onEvolve={() => handleEvolve(pokemon, boxPokemon[idx].id)}
                            onFormChange={() => handleFormChange(pokemon, boxPokemon[idx].id)}
                            onRIP={() => handleRIP(pokemon, boxPokemon[idx].id)}
                            onExport={() => handleExport(boxPokemon[idx], pokemon.pokemon.name)}
                        />
                    ) : (
                        <BoxMenu
                            pokemon={pokemon}
                            pokemonID={boxPokemon[idx].id}
                            runID={props.run.id}
                            open={idx === activeIdx}
                            inverted={isInverted[idx]}
                            onClose={() => setActiveIdx(null)}
                            onRevive={() => handleRevive(pokemon, boxPokemon[idx].id)}
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
