import AboutPagination from "@/components/AboutPagination/AboutPagination";
import { useState } from "react";
import styles from "./AboutPage.module.scss";

const AboutPage: React.FC = () => {
    const pageNames: string[] = ["What is NuzlockeDB?", "What is a Nuzlocke?", "Resources", "Credits"];

    const [currentPage, setCurrentPage] = useState<number>(0);

    return (
        <div className={styles["about-page"]}>
            <section className={`${styles.section} ${currentPage === 0 ? "" : styles.hidden}`}>
                <p className={styles.content}>
                    NuzlockeDB is a resource intended to help players looking to complete a Nuzlocke run for any vanilla
                    Pokémon game. This app can be used to track the progress of your run, search for details on upcoming
                    routes or Pokémon, and strategize your battles and encounters.
                </p>
                <br />
                <p className={styles.content}>
                    This project will likely never finish development. There are a million things I&apos;d like to add
                    and only so much time for me to add them. At the end of the day, this is a passion project and
                    I&apos;m not a professional Nuzlocker, so, whether it&apos;s due to incompetence or missing data,
                    there&apos;s going to be some wrong information here and there. If you find any, feel free to reach
                    out and I&apos;ll try to fix it ASAP!
                </p>
                <br />
            </section>
            <section className={`${styles.section} ${currentPage === 1 ? "" : styles.hidden}`}>
                <p className={styles.content}>
                    Nuzlockes are a fun way to make any Pokémon game more interesting with a set of self-imposed rules
                    that make the game more challenging. The core concepts of a Nuzlocke are 1) if a Pokémon faints, it
                    can no longer be used and 2) only one Pokémon can be caught per area. Any additional rules can be
                    added at the player&apos;s discretion to make the run as fun as possible.
                </p>
                <br />
                <p className={styles.content}>
                    The most common (and my personal favorite) variant of Nuzlockes are &quot;Hardcore Nuzlockes&quot;,
                    which amp the difficulty up even more and generally add rules like the following:
                </p>
                <ul className={styles.list}>
                    <li className={styles["bullet-point"]}>If you whiteout, you must restart the run</li>
                    <li className={styles["bullet-point"]}>
                        You cannot use Pokémon that are a higher level than the next gym leader&apos;s highest level
                        Pokémon
                    </li>
                    <li className={styles["bullet-point"]}>You may not use healing items in battle</li>
                    <li className={styles["bullet-point"]}>You must play in Set mode</li>
                </ul>
                <br />
            </section>
            <section className={`${styles.section} ${currentPage === 2 ? "" : styles.hidden}`}>
                <p className={styles.content}>
                    <a
                        href="https://www.reddit.com/r/nuzlocke/"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                    >
                        r/nuzlocke
                    </a>
                </p>
                <ul className={styles.list}>
                    <li className={styles["bullet-point"]}>
                        A subreddit and community that you can use to get advice and share your Nuzlocke experiences
                    </li>
                </ul>
                <br />
                <p className={styles.content}>
                    <a
                        href="https://projectpokemon.org/home/files/file/1-pkhex/"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                    >
                        PKHeX
                    </a>{" "}
                    /{" "}
                    <a
                        href="https://youtube.com/watch?v=Jw-AiIswbLQ"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                    >
                        PKHeX Tutorial
                    </a>
                </p>
                <ul className={styles.list}>
                    <li className={styles["bullet-point"]}>
                        A save editor that many use to add items like Rare Candies to your game to minimize grinding and
                        maximize playing
                    </li>
                </ul>
                <br />
                <p className={styles.content}>
                    <a
                        href="https://www.youtube.com/pokemonchallenges"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                    >
                        Pokémon Challenges
                    </a>
                </p>
                <ul className={styles.list}>
                    <li className={styles["bullet-point"]}>
                        My personal favorite Nuzlocke content creator that provides solid educational info
                    </li>
                    <li className={styles["bullet-point"]}>
                        If you&apos;re not a fan of his style, find a creator you like instead
                    </li>
                </ul>
                <br />
                <p className={styles.content}>
                    <a href="https://serebii.net/" target="_blank" rel="noreferrer" className={styles.link}>
                        Serebii
                    </a>
                </p>
                <ul className={styles.list}>
                    <li className={styles["bullet-point"]}>
                        Far more accurate for game info than I could ever hope to be
                    </li>
                </ul>
            </section>
            <section className={`${styles.section} ${currentPage === 3 ? "" : styles.hidden}`}>
                <p className={styles.content}>
                    NuzlockeDB was developed by me,{" "}
                    <a href="https://czhangy.io/" target="_blank" rel="noreferrer" className={styles.link}>
                        Charles Zhang
                    </a>
                    . I&apos;m a junior software engineer and a long-time Pokémon fan. Get in touch with me with the
                    links at the bottom of the page, especially if you&apos;ve got any feedback or would like to make a
                    contribution of your own!
                </p>
                <br />
                <p className={styles.content}>
                    This project was made possible thanks to the{" "}
                    <a href="https://pokeapi.co/" target="_blank" rel="noreferrer" className={styles.link}>
                        PokéAPI
                    </a>{" "}
                    and{" "}
                    <a
                        href="https://github.com/Gabb-c/pokenode-ts"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                    >
                        pokenode-ts
                    </a>{" "}
                    tools and various sources like{" "}
                    <a href="https://www.serebii.net/" target="_blank" rel="noreferrer" className={styles.link}>
                        Serebii
                    </a>{" "}
                    and{" "}
                    <a href="https://pokemondb.net/" target="_blank" rel="noreferrer" className={styles.link}>
                        Pokémon Database
                    </a>
                    . Most importantly, huge thanks to the (far superior){" "}
                    <a href="https://nuzlocke.app/" target="_blank" rel="noreferrer" className={styles.link}>
                        Nuzlocke Tracker
                    </a>{" "}
                    app for heavy inspiration ◡̈
                </p>
            </section>
            <AboutPagination
                pageNames={pageNames}
                onSelect={(page: number) => setCurrentPage(page)}
                currentPage={currentPage}
            />
        </div>
    );
};

export default AboutPage;
