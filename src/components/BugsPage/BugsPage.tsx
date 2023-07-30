import bugs from "@/static/bugs";
import styles from "./BugsPage.module.scss";
import Bug from "@/models/Bug";
import Image from "next/image";
import colors from "@/static/colors";

const BugsPage: React.FC = () => {
    return (
        <div className={styles["bugs-page"]}>
            <h2 className={styles.header}>KNOWN BUGS</h2>
            {Object.keys(bugs).map((priority: string, sectionKey: number) => {
                return (
                    <section className={styles.section} key={sectionKey}>
                        <h3 className={styles.priority} style={{ color: "constants.$medium-priority-color" }}>
                            <div className={styles.icon}>
                                <Image src="/assets/icons/alert.svg" alt="" layout="fill" objectFit="contain" />
                            </div>
                            {priority} Priority
                        </h3>
                        <ul className={styles.list}>
                            {bugs[priority].map((bug: Bug, listKey: number) => {
                                return (
                                    <li className={styles.bug} key={listKey}>
                                        <span className={styles.group}>[{bug.group}]</span>
                                        {bug.desc} (
                                        <a className={styles.link} href={bug.link} target="_blank" rel="noreferrer">
                                            Thread
                                        </a>
                                        )
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
