import styles from "./HomePage.module.scss";

import Router from "next/router";

const HomePage: React.FC = () => {
    const createRun = () => {
        Router.push("/test");
    };

    return (
        <div className={styles["home-page"]}>
            <button className={styles["new-button"]} onClick={createRun}>
                + New Run
            </button>
        </div>
    );
};

export default HomePage;
