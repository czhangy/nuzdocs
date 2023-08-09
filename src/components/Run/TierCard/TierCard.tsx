import colors from "@/static/colors";
import styles from "./TierCard.module.scss";

type Props = {
    tier: string;
};

const TierCard: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["tier-card"]} style={{ backgroundColor: colors.tiers[props.tier] }}>
            {props.tier}
        </div>
    );
};

export default TierCard;
