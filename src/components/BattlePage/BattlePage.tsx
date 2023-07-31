import BattleSegment from "@/models/BattleSegment";
import styles from "./BattlePage.module.scss";
import BattlePreview from "@/components/BattlePreview/BattlePreview";

type Props = {
    segment: BattleSegment;
};

const BattlePage: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["battle-page"]}>
            <BattlePreview battle={props.segment.battle} />
        </div>
    );
};

export default BattlePage;
