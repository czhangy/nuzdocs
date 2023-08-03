import BoxMenu from "@/components/BoxMenu/BoxMenu";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { fetchPokemonGroup } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Box.module.scss";

type Props = {
    box: CaughtPokemon[];
    onEvolve: (pokemon: PokemonData, idx: number) => void;
    onRIP: (pokemon: PokemonData, idx: number) => void;
};

const Box: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [boxData, setBoxData] = useState<PokemonData[]>([]);

    // Component state
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [isInverted, setIsInverted] = useState<boolean[]>([]);

    // Compute inverted indices for menu display
    const getInvertedMenus = () => {
        const pokemon: HTMLCollectionOf<Element> = document.getElementsByClassName(styles.pokemon);
        const inverted: boolean[] = [];
        for (let p of pokemon) {
            inverted.push(p.getBoundingClientRect().right > window.innerWidth / 2);
        }
        setIsInverted(inverted);
    };

    // Set Pokemon to active and open its menu
    const handleClick = (idx: number): void => {
        setActiveIdx(idx);
    };

    // Close menu and propagate up
    const handleEvolve = (pokemon: PokemonData, idx: number): void => {
        setActiveIdx(null);
        props.onEvolve(pokemon, idx);
    };

    // Close menu and propagate up
    const handleRIP = (pokemon: PokemonData, idx: number): void => {
        setActiveIdx(null);
        props.onRIP(pokemon, idx);
    };

    // Listen for window resizes to recompute inverted menus
    useEffect(() => {
        window.addEventListener("resize", getInvertedMenus);
        return () => {
            window.removeEventListener("resize", getInvertedMenus);
        };
    }, []);

    // Compute which indices are inverted menus after box data is fetched
    useEffect(getInvertedMenus, [boxData]);

    // Use box to fetch data for all Pokemon in box, ignoring failed encounters
    useEffect(() => {
        if (props.box.length > 0) {
            fetchPokemonGroup(
                props.box
                    .map((pokemon: CaughtPokemon) => pokemon.pokemon.slug)
                    .filter((slug: string) => slug !== "failed")
            ).then((pokemonData: PokemonData[]) => setBoxData(pokemonData));
        }
    }, [props.box]);

    return (
        <>
            <div className={styles.box}>
                {boxData.map((pokemon: PokemonData, key: number) => (
                    <div className={styles.pokemon} key={key}>
                        <button
                            className={`${styles.button} ${key === activeIdx ? styles.active : ""}`}
                            onClick={() => handleClick(key)}
                            key={key}
                        >
                            <Image src={pokemon.sprite} alt={pokemon.pokemon.name} layout="fill" objectFit="contain" />
                        </button>
                        {isInverted.length > 0 ? (
                            <BoxMenu
                                open={key === activeIdx}
                                pokemon={pokemon}
                                onClose={() => setActiveIdx(null)}
                                onEvolve={() => handleEvolve(pokemon, key)}
                                onRIP={() => handleRIP(pokemon, key)}
                                inverted={isInverted[key]}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Box;
