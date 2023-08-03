import BoxMenu from "@/components/BoxMenu/BoxMenu";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { fetchPokemonGroup } from "@/utils/api";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import styles from "./Box.module.scss";

type Props = {
    box: CaughtPokemon[];
};

const Box: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [boxData, setBoxData] = useState<PokemonData[]>([]);

    // Component state
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    // Set Pokemon to active and open its menu
    const handleClick = (idx: number): void => {
        setActiveIdx(idx);
        setMenuOpen(true);
    };

    // Delay menu close to allow clicks to register
    const handleClose = (): void => {
        setActiveIdx(null);
        setTimeout(() => {
            setMenuOpen(false);
        }, 100);
    };

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
                    <button
                        className={`${styles.pokemon} ${key === activeIdx ? styles.active : ""}`}
                        onClick={() => handleClick(key)}
                        key={key}
                    >
                        <Image src={pokemon.sprite} alt={pokemon.pokemon.name} layout="fill" objectFit="contain" />
                    </button>
                ))}
            </div>
            <BoxMenu open={menuOpen} onClose={handleClose} />
        </>
    );
};

export default Box;
