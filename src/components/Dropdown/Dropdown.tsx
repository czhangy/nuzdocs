import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";

type Props = {
    placeholder: string;
    value: string | null;
    options: string[];
    onSelect: (label: string) => void;
    disabled?: boolean;
    reversed?: boolean;
};

const Dropdown: React.FC<Props> = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    // Propagate selection to parent and close the dropdown
    const handleSelect = (label: string) => {
        setOpen(false);
        props.onSelect(label);
    };

    // Close dropdown on scroll
    useEffect(() => {
        window.addEventListener("scroll", () => setOpen(false));
    }, []);

    return (
        <div className={`${styles.dropdown} ${props.reversed ? styles.reversed : ""}`}>
            <div
                className={`${styles.overlay} ${open ? "" : styles.hidden}`}
                onClick={() => setOpen(false)}
                onScroll={() => setOpen(false)}
            />
            <div
                className={`${styles.controller} ${props.disabled ? styles.disabled : ""}`}
                onClick={() => setOpen(true)}
            >
                <p className={styles["display-value"]}>{props.value ? props.value : props.placeholder}</p>
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
