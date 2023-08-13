import styles from "./PokedexPage.module.scss";

type Props = {
    group: string;
    pokemon: string;
};

const PokedexPage: React.FC<Props> = (props: Props) => {
    return <div className={styles["pokedex-page"]}></div>;
};

export default PokedexPage;
