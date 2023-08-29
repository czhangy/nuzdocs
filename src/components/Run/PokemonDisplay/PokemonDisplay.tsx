import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import { getPokedexLink, getTypeCardSrc } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import styles from "./PokemonDisplay.module.scss";

type Props = {
    pokemon: PokemonData;
    set?: Pokemon;
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
                    {props.set ? <strong className={styles.level}>Lv. {props.set.level}</strong> : ""}
                </div>
                {props.set ? (
                    <p className={styles.text}>{props.set.item ? props.set.item.name : "No held item"}</p>
                ) : (
                    ""
                )}
                {props.set ? <p className={styles.text}>{props.set.ability!.name}</p> : ""}
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
