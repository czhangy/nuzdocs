import AboutPagination from "@/components/AboutPagination/AboutPagination";
import { useState } from "react";
import styles from "./AboutPage.module.scss";

const AboutPage: React.FC = () => {
    const pageNames: string[] = ["What is NuzlockeDB?", "What is a Nuzlocke?", "Resources", "Credits"];

    const [currentPage, setCurrentPage] = useState<number>(0);

    return (
        <div className={styles["about-page"]}>
            <AboutPagination
                pageNames={pageNames}
                onSelect={(page: number) => setCurrentPage(page)}
                currentPage={currentPage}
            />
        </div>
    );
};

export default AboutPage;
