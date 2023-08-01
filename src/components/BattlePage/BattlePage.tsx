import BattleSegment from "@/models/BattleSegment";
import styles from "./BattlePage.module.scss";
import BattlePreview from "@/components/BattlePreview/BattlePreview";
import PokemonCard from "@/components/PokemonCard/PokemonCard";

type Props = {
    battleSlug: string;
    segment: BattleSegment;
    runName: string;
};

const BattlePage: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["battle-page"]}>
            <BattlePreview
                trainer={props.segment.battle.trainer}
                battleSlug={props.battleSlug}
                runName={props.runName}
            />
            <div className={styles.team}>
                <PokemonCard pokemon={props.segment.battle.team[0]} />
            </div>
        </div>
    );
};

export default BattlePage;
