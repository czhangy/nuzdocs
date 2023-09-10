import ItemDisplay from "@/components/Battle/ItemDisplay/ItemDisplay";
import PokemonDisplay from "@/components/Run/PokemonDisplay/PokemonDisplay";
import Battle from "@/models/Battle";
import ItemData from "@/models/ItemData";
import NamedResource from "@/models/NamedResource";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { exportPokemonList } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";
import styles from "./TrainerCard.module.scss";

type Props = {
    battle: Battle;
    run: Run;
    pokemon: { [pokemon: string]: PokemonData };
    items: { [item: string]: ItemData };
};

const TrainerCard: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    // Save battle team to clipboard
    const handleExport = (): void => {
        exportPokemonList(
            props.battle.team,
            props.battle.team.map((pokemon: Pokemon) => props.pokemon[pokemon.slug].pokemon.name),
            `${props.run.gameSlug}-${props.battle.trainer.class.toLowerCase()}-${props.battle.name.toLowerCase()}`
        );
    };

    return (
        <div className={`${styles["trainer-card"]} ${open ? styles.open : ""}`}>
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
                        <div className={styles.main}>
                            <p className={styles.name}>
                                {props.battle.trainer.class} {props.battle.name}
                            </p>
                            {props.battle.required ? (
                                <div className={styles.icon} title="This battle is required">
                                    <Image
                                        src="/assets/icons/star.svg"
                                        alt="Required"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                            {props.battle.double ? (
                                <div className={styles.icon} title="This is a double battle">
                                    <Image
                                        src="/assets/icons/double.svg"
                                        alt="Double battle"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
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
            {Object.keys(props.pokemon).length > 0 ? (
                <ul className={styles.body}>
                    {props.battle.team.map((pokemon: Pokemon, key: number) => {
                        return (
                            <li key={key}>
                                <div className={styles.pokemon}>
                                    <PokemonDisplay
                                        pokemon={props.pokemon[pokemon.slug]}
                                        set={pokemon}
                                        runID={props.run.id}
                                    />
                                    <div className={styles.moves}>
                                        {pokemon.moves.map((move: NamedResource) => (
                                            <p className={styles.move} key={move.slug}>
                                                {move.name}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className={styles.loading}>
                    <div className="bg-spinner" />
                </div>
            )}
            <button className={styles.toggle} onClick={() => setOpen(!open)}>
                {open ? "-" : "+"}
            </button>
        </div>
    );
};

export default TrainerCard;
