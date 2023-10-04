import styles from "./Tags.module.scss";

type Props = {
    tags: string[];
};

const Tags: React.FC<Props> = (props: Props) => {
    const getTitle = (tag: string) => {
        const title: { [tag: string]: string } = {
            Required: "This is a required battle",
            "Double Battle": "This is a double battle",
        };
        return title[tag];
    };

    return props.tags.length > 0 ? (
        <ul className={styles.tags}>
            {props.tags.map((tag: string) => {
                return (
                    <li
                        className={`${styles.tag} ${styles[tag.replace(/ /g, "-").toLowerCase()]}`}
                        title={getTitle(tag)}
                        key={tag}
                    >
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
