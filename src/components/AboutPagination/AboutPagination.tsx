import styles from "./AboutPagination.module.scss";

type Props = {
    pageNames: string[];
    onSelect: (page: number) => void;
    currentPage: number;
};

const AboutPagination: React.FC<Props> = (props: Props) => {
    return (
        <ul className={styles["about-pagination"]}>
            {props.pageNames.map((name: string, key: number) => {
                return (
                    <li className={styles["page-entry"]} key={key}>
                        <button
                            className={`${styles["page-button"]} ${props.currentPage === key ? styles.active : ""}`}
                            onClick={() => props.onSelect(key)}
                        >
                            <p className={styles["page-num"]}>
                                {key + 1}
                                <span className={styles.underline} />
                            </p>
                            <p className={styles["page-name"]}>{name}</p>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default AboutPagination;
