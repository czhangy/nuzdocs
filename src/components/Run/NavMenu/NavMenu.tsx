import Run from "@/models/Run";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./NavMenu.module.scss";

type Props = {
    run: Run;
};

const NavMenu: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    // Named function for event listener callback
    const closeMenu = (): void => setOpen(false);

    // Close menu on scroll
    useEffect(() => {
        document.addEventListener("scroll", closeMenu);
        return () => {
            document.removeEventListener("scroll", closeMenu);
        };
    }, []);

    return (
        <div className={`${styles["nav-menu"]} ${open ? styles.open : ""}`}>
            <div className={styles.overlay} onClick={() => setOpen(false)} />
            <button className={styles.button} onClick={() => setOpen(!open)}>
                <hr className={styles.dash} />
                <hr className={styles.dash} />
                <hr className={styles.dash} />
            </button>
            <ul className={styles.menu} onClick={() => setOpen(false)}>
                <li className={styles.option}>
                    <Link href={`/runs/${props.run.id}/${props.run.prevIdx}`}>
                        <a className={styles.link}>
                            <div className={styles.icon}>
                                <Image src="/assets/icons/path.svg" alt="Overview" layout="fill" objectFit="contain" />
                            </div>
                            <p className={styles.page}>Run</p>
                        </a>
                    </Link>
                </li>
                <li className={styles.option}>
                    <Link href={`/runs/${props.run.id}/overview`}>
                        <a className={styles.link}>
                            <div className={styles.icon}>
                                <Image
                                    src="/assets/icons/pokeball.svg"
                                    alt="Overview"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <p className={styles.page}>Overview</p>
                        </a>
                    </Link>
                </li>
                <li className={styles.option}>
                    <Link href={`/runs/${props.run.id}/box`}>
                        <a className={styles.link}>
                            <div className={styles.icon}>
                                <Image src="/assets/icons/box.svg" alt="Box" layout="fill" objectFit="contain" />
                            </div>
                            <p className={styles.page}>Box</p>
                        </a>
                    </Link>
                </li>
                <li className={styles.option}>
                    <Link href={`/runs/${props.run.id}/rips`}>
                        <a className={styles.link}>
                            <div className={styles.icon}>
                                <Image src="/assets/icons/dead.svg" alt="Dead" layout="fill" objectFit="contain" />
                            </div>
                            <p className={styles.page}>RIPs</p>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavMenu;
