import styles from "./Tags.module.scss";

type Props = {
    tags: string[];
};

const Tags: React.FC<Props> = (props: Props) => {
    return props.tags.length > 0 ? (
        <ul className={styles.tags}>
            {props.tags.map((tag: string) => {
                return (
                    <li className={`${styles.tag} ${styles[tag.replace(/ /g, "-").toLowerCase()]}`} key={tag}>
                        {tag}
                    </li>
                );
            })}
        </ul>
    ) : (
        <></>
    );
};

export default Tags;
