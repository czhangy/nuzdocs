import BattleSegment from "@/models/BattleSegment";
import styles from "./BattlePage.module.scss";
import BattlePreview from "@/components/BattlePreview/BattlePreview";

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
        </div>
    );
};

export default BattlePage;
