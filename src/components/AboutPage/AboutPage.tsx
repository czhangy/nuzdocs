import { useState } from "react";
import styles from "./AboutPage.module.scss";

const AboutPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    return <div className={styles["about-page"]}></div>;
};

export default AboutPage;
