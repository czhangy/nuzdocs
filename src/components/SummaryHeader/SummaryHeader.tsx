import PokemonData from "@/models/PokemonData";
import { getRun, isAlive } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import Image from "next/image";
import styles from "./SummaryHeader.module.scss";
import { getGameGroup } from "@/utils/game";

type Props = {
    pokemonData: PokemonData;
    nickname: string;
    metLocation: string;
    runName: string;
};

const SummaryHeader: React.FC<Props> = (props: Props) => {
    // Compute the name of the location the Pokemon was met at
    const getMetLocation = (): string => {
        if (props.metLocation === "starter") {
            return getSegment(
                getRun(props.runName).gameSlug,
                getGameGroup(getRun(props.runName).gameSlug).startingTownSlug
            ).name;
        } else {
            return getSegment(getRun(props.runName).gameSlug, props.metLocation).name;
        }
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
                    <strong>{props.nickname}</strong> the {props.pokemonData.pokemon.name}
                </p>
                <p className={styles.text}>
                    Met at: <strong>{getMetLocation()}</strong>
                </p>
                <p className={styles.text}>
                    Status: <strong>{isAlive(props.runName, props.nickname) ? "Alive" : "RIP'd"}</strong>
                </p>
            </div>
        </div>
    );
};

export default SummaryHeader;
