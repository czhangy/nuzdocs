import BoxMenu from "@/components/Run/BoxMenu/BoxMenu";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { fetchPokemonList } from "@/utils/api";
import { exportPokemon } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Box.module.scss";

type Props = {
    box: CaughtPokemon[];
    run: Run;
    onEvolve?: (pokemon: PokemonData, id: string) => void;
    onRIP?: (pokemon: PokemonData, id: string) => void;
    onRevive?: (pokemon: PokemonData, id: string) => void;
};

const Box: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [sets, setSets] = useState<CaughtPokemon[]>([]);
    const [pokemon, setPokemon] = useState<PokemonData[]>([]);

    // Component state
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
        exportPokemon(pokemon.pokemon, name, pokemon.nickname ? pokemon.nickname : "NuzDocs");
    };

    // Listen for window resizes to recompute inverted menus when component ready
    useEffect(() => {
        getInvertedMenus();
        window.addEventListener("resize", getInvertedMenus);
        return () => {
            window.removeEventListener("resize", getInvertedMenus);
        };
    }, [pokemon]);

    // Use box to fetch data for all Pokemon in box
    useEffect(() => {
        if (props.box.length > 0 && props.run) {
            setIsLoading(true);
            setSets(props.box);
            fetchPokemonList(
                props.box.map((pokemon: CaughtPokemon) => pokemon.pokemon.slug),
                props.run.gameSlug
            ).then((pokemon: PokemonData[]) => {
                setPokemon(pokemon);
                setIsLoading(false);
            });
        } else {
            setSets([]);
            setPokemon([]);
            setIsLoading(false);
        }
    }, [props.box, props.run]);

    return pokemon.length > 0 && pokemon.length === sets.length ? (
        <div className={styles.box}>
            {pokemon.map((pokemon: PokemonData, idx: number) => (
                <div className={styles.pokemon} key={sets[idx].id}>
                    <button
                        className={`${styles.button} ${idx === activeIdx ? styles.active : ""}`}
                        onClick={() => setActiveIdx(idx)}
                    >
                        <Image src={pokemon.sprite} alt={pokemon.pokemon.name} layout="fill" objectFit="contain" />
                    </button>
                    {props.onEvolve ? (
                        <BoxMenu
                            pokemon={pokemon}
                            pokemonID={sets[idx].id}
                            runID={props.run.id}
                            open={idx === activeIdx}
                            inverted={isInverted[idx]}
                            onClose={() => setActiveIdx(null)}
                            onEvolve={() => handleEvolve(pokemon, sets[idx].id)}
                            onRIP={() => handleRIP(pokemon, sets[idx].id)}
                            onExport={() => handleExport(sets[idx], pokemon.pokemon.name)}
                        />
                    ) : (
                        <BoxMenu
                            pokemon={pokemon}
                            pokemonID={sets[idx].id}
                            runID={props.run.id}
                            open={idx === activeIdx}
                            inverted={isInverted[idx]}
                            onClose={() => setActiveIdx(null)}
                            onRevive={() => handleRevive(pokemon, sets[idx].id)}
                        />
                    )}
                </div>
            ))}
        </div>
    ) : isLoading ? (
        <div className={styles.loading}>
            <div className="accent-spinner" />
        </div>
    ) : (
        <p className={styles.empty}>{props.onEvolve ? "No Pokémon left!" : "No RIPs yet!"}</p>
    );
};

export default Box;
