import styles from "./StarterSelect.module.scss";

import Pokemon from "@/models/Pokemon";

type Props = {
    starters: Pokemon[];
};

const StarterSelect: React.FC<Props> = (props: Props) => {
    return <div className={styles["starter-select"]}></div>;
};

export default StarterSelect;
