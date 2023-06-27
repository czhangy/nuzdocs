import styles from "./HomePage.module.scss";

import { useRouter } from "next/router";

const HomePage: React.FC = () => {
    const createRun = () => {
        const router = useRouter();
        router.push("/run");
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
