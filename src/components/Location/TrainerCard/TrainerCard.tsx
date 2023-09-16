import PokemonDisplay from "@/components/Run/PokemonDisplay/PokemonDisplay";
import ItemCount from "@/components/Segment/ItemCount/ItemCount";
import Tags from "@/components/Segment/Tags/Tags";
import Toggle from "@/components/Segment/Toggle/Toggle";
import Battle from "@/models/Battle";
import ItemData from "@/models/ItemData";
import NamedResource from "@/models/NamedResource";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { exportPokemonList } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
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

    // Internal state
    const [item, setItem] = useState<ItemData | null>(null);

    // Save battle team to clipboard
    const handleExport = (): void => {
        exportPokemonList(
            props.battle.team,
            props.battle.team.map((pokemon: Pokemon) => props.pokemon[pokemon.slug].pokemon.name),
            `${props.run.gameSlug}-${props.battle.trainer.class.toLowerCase()}-${props.battle.name.toLowerCase()}`
        );
    };

    // Save item on component load if it exists
    useEffect(() => {
        if (props.battle && props.items) {
            setOpen(false);
            setItem(null);
            if (Object.keys(props.battle.items).length > 0) {
                setItem(props.items[Object.keys(props.battle.items)[0]]);
            }
        }
    }, [props.battle, props.items]);

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
                        <Tags tags={props.battle.tags} />
                        <div className={styles.main}>
                            <p className={styles.name}>
                                {props.battle.trainer.class} {props.battle.name}
                            </p>
                            <ItemCount item={item} count={item ? props.battle.items[item.slug] : -1} />
                        </div>
                        <p className={styles.location}>{props.battle.location}</p>
                    </div>
                </div>
                <button
                    className={`${styles.export} disable-select`}
                    disabled={Object.keys(props.pokemon).length === 0}
                    onClick={handleExport}
                    title="Export team to clipboard"
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
            <Toggle open={open} onClick={(open: boolean) => setOpen(open)} />
        </div>
    );
};

export default TrainerCard;
