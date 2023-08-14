import PokemonData from "@/models/PokemonData";
import { getPokedexLink, getTypeCardSrc } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import styles from "./PokemonDisplay.module.scss";

type Props = {
    pokemon: PokemonData;
    runID: string;
};

const PokemonDisplay: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["pokemon-display"]}>
            <div className={styles.sprite}>
                <Image src={props.pokemon.sprite} alt={props.pokemon.pokemon.name} layout="fill" objectFit="contain" />
            </div>
            <div className={styles.info}>
                <div className={styles.top}>
                    <Link href={getPokedexLink(props.runID, props.pokemon.pokemon.slug)}>
                        <a className={styles.name}>{props.pokemon.pokemon.name}</a>
                    </Link>
                </div>
                <ul className={styles.types}>
                    {props.pokemon.types.map((type: string) => {
                        return (
                            <div className={styles.type} key={type}>
                                <Image src={getTypeCardSrc(type)} alt={type} layout="fill" objectFit="contain" />
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PokemonDisplay;
