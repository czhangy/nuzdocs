import Image from "next/image";
import { useState } from "react";
import styles from "./Dropdown.module.scss";

type Props = {
    placeholder: string;
    options: string[];
    onSelect: (label: string) => void;
};

const Dropdown: React.FC<Props> = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [displayValue, setDisplayValue] = useState<string>(props.placeholder);

    window.addEventListener("scroll", () => setOpen(false));

    const handleSelect = (label: string) => {
        setDisplayValue(label);
        setOpen(false);
        props.onSelect(label);
    };

    return (
        <div className={styles.dropdown}>
            <div
                className={`${styles.overlay} ${open ? "" : styles.hidden}`}
                onClick={() => setOpen(false)}
                onScroll={() => setOpen(false)}
            />
            <div className={styles.controller} onClick={() => setOpen(!open)}>
                <p className={styles["display-value"]}>{displayValue}</p>
                <div className={`${styles.arrow} ${open ? styles.flipped : ""}`}>
                    <Image
                        src="/assets/icons/chevron.svg"
                        alt={open ? "Close dropdown" : "Open dropdown"}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </div>
            <ul className={`${styles["dropdown-options"]} ${open ? "" : styles.hidden}`}>
                {props.options.map((option: string, key: number) => {
                    return (
                        <li className={styles["dropdown-option"]} key={key} onClick={() => handleSelect(option)}>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Dropdown;
