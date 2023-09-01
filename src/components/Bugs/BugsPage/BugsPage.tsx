import Bug from "@/models/Bug";
import bugs from "@/static/bugs";
import colors from "@/static/colors";
import Image from "next/image";
import styles from "./BugsPage.module.scss";

const BugsPage: React.FC = () => {
    return (
        <div className={styles["bugs-page"]}>
            <h2 className={styles.header}>Known Bugs</h2>
            <a
                className={styles.button}
                href="https://github.com/czhangy/nuzlocke-db/issues"
                target="_blank"
                rel="noreferrer"
            >
                Report a Bug!
            </a>
            {Object.keys(bugs).map((priority: string, sectionKey: number) => {
                return (
                    <section className={styles.section} key={sectionKey}>
                        <h3 className={styles.priority} style={{ color: colors.priorities[priority] }}>
                            <div
                                className={`${styles.icon} disable-select`}
                                style={{ filter: colors.priorities_svg[priority] }}
                            >
                                <Image src="/assets/icons/alert.svg" alt="" layout="fill" objectFit="contain" />
                            </div>
                            {priority} Priority
                        </h3>
                        <ul className={styles.list}>
                            {bugs[priority].map((bug: Bug, listKey: number) => {
                                return (
                                    <li className={styles.bug} key={listKey}>
                                        <span className={styles.group}>[{bug.group}]</span>
                                        {bug.desc}{" "}
                                        {bug.link ? (
                                            <span>
                                                (
                                                <a
                                                    className={styles.link}
                                                    href={bug.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Thread
                                                </a>
                                                )
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
};

export default BugsPage;
