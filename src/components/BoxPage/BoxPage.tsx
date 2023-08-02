import styles from "./BoxPage.module.scss";

type Props = {
    runName: string;
};

const BoxPage: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["box-page"]}>
            <h2 className={styles.header}>Your Box</h2>
        </div>
    );
};

export default BoxPage;
