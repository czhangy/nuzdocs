import TrainerCard from "@/components/Location/TrainerCard/TrainerCard";
import Battle from "@/models/Battle";
import styles from "./Trainers.module.scss";

type Props = {
    battles: Battle[];
    game: string;
};

const Trainers: React.FC<Props> = (props: Props) => {
    return props.battles.length > 0 ? (
        <div className={styles.trainers}>
            <h3 className={styles.header}>Trainers:</h3>
            <ul className={styles.list}>
                {props.battles.map((battle: Battle, key: number) => {
                    return (
                        <li key={key}>
                            <TrainerCard battle={battle} game={props.game} />
                        </li>
                    );
                })}
            </ul>
        </div>
    ) : (
        <></>
    );
};

export default Trainers;
