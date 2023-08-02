import styles from "./BoxPage.module.scss";

type Props = {
    runName: string;
};

const BoxPage: React.FC<Props> = (props: Props) => {
    return <div className={styles["box-page"]}></div>;
};

export default BoxPage;
