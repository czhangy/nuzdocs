import BattlePreview from "@/components/BattlePreview/BattlePreview";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import Battle from "@/models/Battle";
import BattleSegment from "@/models/BattleSegment";
import Pokemon from "@/models/Pokemon";
import { getBattle } from "@/utils/battle";
import { getRun } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./BattlePage.module.scss";

type Props = {
    battleSlug: string;
    segment: BattleSegment;
    runName: string;
};

const BattlePage: React.FC<Props> = (props: Props) => {
    // Internal data state
    const [battle, setBattle] = useState<Battle | null>(null);

    // Extract battle from segment, checking if it's an object (multiple battle variants) or a Battle
    useEffect(() => {
        if (props.segment) {
            setBattle(getBattle(getRun(props.runName).gameSlug, props.battleSlug, getRun(props.runName).starterSlug));
        }
    });

    return battle ? (
        <div className={styles["battle-page"]}>
            <BattlePreview
                battle={battle}
                levelCap={props.segment.levelCap}
                battleSlug={props.battleSlug}
                runName={props.runName}
            />
            <div className={styles.team}>
                {battle.team.map((pokemon: Pokemon, key: number) => (
                    <PokemonCard pokemon={pokemon} key={key} />
                ))}
            </div>
        </div>
    ) : (
        <></>
    );
};

export default BattlePage;
