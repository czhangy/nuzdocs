import Link from "next/link";
import styles from "./BoxMenu.module.scss";
import { useEffect } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    location: { x: number; y: number };
};

const BoxMenu: React.FC<Props> = (props: Props) => {
    // Calculate menu orientation relative to click position
    const getMenuLocation = () => {
        let style: { [property: string]: string | number } = { left: props.location.x, top: props.location.y };
        if (props.location.x > window.innerWidth / 2) {
            style.transform = "translateX(-100%)";
        }
        if (props.location.y > window.innerHeight / 2) {
            if ("transform" in style) {
                style.transform += " translateY(-100%)";
            } else {
                style.transform = "translateY(-100%)";
            }
        }
        console.log(style);
        return style;
    };

    // Compute menu location on component load to protect window access
    useEffect(() => {}, []);

    return (
        <div className={`${styles["box-menu"]} ${props.open ? "" : styles.hide}`}>
            <div className={styles.overlay} onClick={props.onClose} />
            <div className={styles.menu} style={getMenuLocation()}>
                <Link href="/">
                    <a className={styles.option}>Summary</a>
                </Link>
                <button className={styles.option}>Evolve</button>
                <button className={styles.option}>RIP</button>
            </div>
        </div>
    );
};

export default BoxMenu;
