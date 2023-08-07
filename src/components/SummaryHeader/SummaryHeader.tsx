import PokemonData from "@/models/PokemonData";
import { getRun, isAlive } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import Image from "next/image";
import styles from "./SummaryHeader.module.scss";

type Props = {
    pokemonData: PokemonData;
    nickname: string;
    metLocation: string;
    runName: string;
};

const SummaryHeader: React.FC<Props> = (props: Props) => {
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
                    Met at: <strong>{getSegment(getRun(props.runName).gameSlug, props.metLocation).name}</strong>
                </p>
                <p className={styles.text}>
                    Status: <strong>{isAlive(props.runName, props.nickname) ? "Alive" : "RIP'd"}</strong>
                </p>
            </div>
        </div>
    );
};

export default SummaryHeader;
