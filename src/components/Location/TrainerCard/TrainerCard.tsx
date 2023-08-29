import ItemDisplay from "@/components/Battle/ItemDisplay/ItemDisplay";
import Battle from "@/models/Battle";
import ItemData from "@/models/ItemData";
import PokemonData from "@/models/PokemonData";
import Image from "next/image";
import styles from "./TrainerCard.module.scss";
import { exportPokemonList } from "@/utils/utils";
import Pokemon from "@/models/Pokemon";

type Props = {
    battle: Battle;
    game: string;
    pokemon: { [pokemon: string]: PokemonData };
    items: { [item: string]: ItemData };
};

const TrainerCard: React.FC<Props> = (props: Props) => {
    // Save battle team to clipboard
    const handleExport = (): void => {
        exportPokemonList(
            props.battle.team,
            props.battle.team.map((pokemon: Pokemon) => props.pokemon[pokemon.slug].pokemon.name),
            `${props.game}-${props.battle.trainer.class.toLowerCase()}-${props.battle.name.toLowerCase()}`
        );
    };

    return (
        <div className={styles["trainer-card"]}>
            <div className={styles.header}>
                <div className={styles.trainer}>
                    <div className={styles.sprite}>
                        <Image
                            src={props.battle.trainer.sprite}
                            alt={props.battle.trainer.class}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <div className={styles.info}>
                        <p className={styles.name}>
                            {props.battle.trainer.class} {props.battle.name}
                        </p>
                        <p className={styles.location}>{props.battle.location}</p>
                        {props.battle.items.length > 0 ? (
                            <div className={styles.items}>
                                {props.battle.items.map((item: string, key: number) => {
                                    return item in props.items ? (
                                        <ItemDisplay item={props.items[item]} showName={false} key={key} />
                                    ) : (
                                        ""
                                    );
                                })}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <button
                    className={styles.export}
                    disabled={Object.keys(props.pokemon).length === 0}
                    onClick={handleExport}
                >
                    <Image src="/assets/icons/copy.svg" alt="Copy sets" layout="fill" objectFit="contain" />
                </button>
            </div>
        </div>
    );
};

export default TrainerCard;
