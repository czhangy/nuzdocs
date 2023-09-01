import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";

type Props = {
    placeholder: string;
    value: string | null;
    options: string[];
    onSelect: (label: string) => void;
    border: boolean;
    minWidth?: number;
};

const Dropdown: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    // Propagate selection to parent and close the dropdown
    const handleSelect = (label: string) => {
        setOpen(false);
        props.onSelect(label);
    };

    // Get any styling from props
    const getStyling = (): CSSProperties => {
        const style: CSSProperties = {
            border: props.border ? "" : "none",
        };
        if (props.minWidth) {
            style.minWidth = props.minWidth;
        }
        return style;
    };

    // Close dropdown on scroll
    useEffect(() => {
        window.addEventListener("scroll", () => setOpen(false));
    }, []);

    return (
        <div className={styles.dropdown}>
            <div
                className={`${styles.overlay} ${open ? "" : styles.hidden}`}
                onClick={() => setOpen(false)}
                onScroll={() => setOpen(false)}
            />
            <div className={styles.controller} onClick={() => setOpen(true)} style={getStyling()}>
                <p className={styles.display}>{props.value ? props.value : props.placeholder}</p>
                <div className={`${styles.arrow} ${open ? styles.flipped : ""} disable-select`}>
                    <Image
                        src="/assets/icons/chevron.svg"
                        alt={open ? "Close dropdown" : "Open dropdown"}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </div>
            <ul className={`${styles.menu} ${open ? "" : styles.hidden}`}>
                {props.options.map((option: string, key: number) => {
                    return (
                        <li key={key}>
                            <button className={styles.option} onClick={() => handleSelect(option)}>
                                {option}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Dropdown;
