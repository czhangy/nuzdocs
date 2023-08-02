import Box from "@/components/Box/Box";
import { getBox } from "@/utils/utils";
import styles from "./BoxPage.module.scss";
import { useEffect, useState } from "react";
import CaughtPokemon from "@/models/CaughtPokemon";

type Props = {
    runName: string;
};

const BoxPage: React.FC<Props> = (props: Props) => {
    // LocalStorage data state
    const [box, setBox] = useState<CaughtPokemon[]>([]);

    // Access local storage on component load
    useEffect(() => {
        if (props.runName) {
            setBox(getBox(props.runName));
        }
    }, [props.runName]);

    return (
        <div className={styles["box-page"]}>
            <h2 className={styles.header}>Your Box</h2>
            <Box box={box} />
        </div>
    );
};

export default BoxPage;
