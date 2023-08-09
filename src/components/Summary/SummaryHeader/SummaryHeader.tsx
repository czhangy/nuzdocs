import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { getGameGroup } from "@/utils/game";
import { isAlive } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import Image from "next/image";
import styles from "./SummaryHeader.module.scss";

type Props = {
    caughtPokemon: CaughtPokemon;
    pokemonData: PokemonData;
    run: Run;
};

const SummaryHeader: React.FC<Props> = (props: Props) => {
    // Compute the name of the location the Pokemon was met at
    const getMetLocation = (): string => {
        return getSegment(
            props.run.gameSlug,
            props.caughtPokemon.locationSlug === "starter"
                ? getGameGroup(props.run.gameSlug).startingTownSlug
                : props.caughtPokemon.locationSlug
        ).name;
    };

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
                <p className={styles.text}>
                    <strong>
                        {props.caughtPokemon.nickname
                            ? props.caughtPokemon.nickname
                            : props.caughtPokemon.pokemon.species}
                    </strong>{" "}
                    the {props.pokemonData.pokemon.name}
                </p>
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
