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
                    This project will likely never finish development. There are a million things I'd like to add and
                    only so much time for me to add them. At the end of the day, this is a passion project and I'm not a
                    professional Nuzlocker, so, whether it's due to incompetence or missing data, there's going to be
                    some wrong information here and there. If you find any, feel free to reach out and I'll try to fix
                    it ASAP!
                </p>
                <br />
            </section>
            <section className={`${styles.section} ${currentPage === 3 ? "" : styles.hidden}`}>
                <p className={styles.content}>
                    NuzlockeDB was developed by me,{" "}
                    <a href="https://czhangy.io/" target="_blank" rel="noreferrer" className={styles.link}>
                        Charles Zhang
                    </a>
                    . I'm a junior software engineer and a long-time Pokémon fan. Get in touch with me with the links at
                    the bottom of the page, especially if you've got any feedback or would like to make a contribution
                    of your own!
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
