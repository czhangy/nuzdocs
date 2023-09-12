import Tooltip from "@/components/Run/Tooltip/Tooltip";
import AbilityData from "@/models/AbilityData";
import { useState } from "react";
import styles from "./AbilityDisplay.module.scss";

type Props = {
    ability: AbilityData;
};

const AbilityDisplay: React.FC<Props> = (props: Props) => {
    // Component state
    const [show, setShow] = useState<boolean>(false);

    return (
        <div
            className={styles["ability-display"]}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <p className={styles.name}>{props.ability.name}</p>
            <Tooltip desc={props.ability.desc} show={show} />
        </div>
    );
};

export default AbilityDisplay;
