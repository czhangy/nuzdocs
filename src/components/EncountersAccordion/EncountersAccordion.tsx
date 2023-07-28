import EncounterData from "@/models/EncounterData";
import PokemonData from "@/models/PokemonData";
import styles from "./EncountersAccordion.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPokemonTier } from "@/utils/utils";
import colors from "@/static/colors";

type Props = {
    pokemonData: PokemonData;
    encounterData: EncounterData[];
    versionGroup: string;
};

const EncountersAccordion: React.FC<Props> = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [tier, setTier] = useState<string>("N/A");

    useEffect(() => {
        if (props.pokemonData && props.versionGroup) {
            setTier(getPokemonTier(props.pokemonData.pokemon.slug, props.versionGroup));
        }
    }, [props.pokemonData, props.versionGroup]);

    return (
        <div className={styles["encounters-accordion"]}>
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.sprite}>
                    <Image
                        src={props.pokemonData.sprite}
                        alt={props.pokemonData.pokemon.name}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className={styles.info}>
                    <div className={`${styles.row} ${styles["top-row"]}`}>
                        <p className={styles.name}>{props.pokemonData.pokemon.name}</p>
                        <div className={styles.tier} style={{ backgroundColor: colors.tiers[tier] }}>
                            {tier}
                        </div>
                    </div>
                    <div className={styles.row}>
                        {props.pokemonData.types.map((type: string, key: number) => {
                            return (
                                <div className={styles.type} key={key}>
                                    <Image
                                        src={`https://www.serebii.net/pokedex-bw/type/${type}.gif`}
                                        alt={type}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={`${styles.arrow} ${isOpen ? styles.reversed : ""}`}>
                    <Image
                        src="/assets/icons/arrow.svg"
                        alt={isOpen ? "Close accordion" : "Open accordion"}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </button>
        </div>
    );
};

export default EncountersAccordion;
