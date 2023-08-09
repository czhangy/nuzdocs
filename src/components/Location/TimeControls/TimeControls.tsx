import Image from "next/image";
import styles from "./TimeControls.module.scss";

type Props = {
    time: "time-morning" | "time-day" | "time-night";
    onClick: (time: "time-morning" | "time-day" | "time-night") => void;
    inline: boolean;
};

const TimeControls: React.FC<Props> = (props: Props) => {
    return (
        <div className={`${styles["time-controls"]} ${props.inline ? styles.inline : ""}`}>
            <button
                className={`${styles.time} ${props.time === "time-morning" ? styles.active : ""}`}
                onClick={() => props.onClick("time-morning")}
            >
                <Image src="/assets/icons/morning.svg" alt="Morning" layout="fill" objectFit="contain" />
            </button>
            <button
                className={`${styles.time} ${props.time === "time-day" ? styles.active : ""}`}
                onClick={() => props.onClick("time-day")}
            >
                <Image src="/assets/icons/day.svg" alt="Day" layout="fill" objectFit="contain" />
            </button>
            <button
                className={`${styles.time} ${props.time === "time-night" ? styles.active : ""}`}
                onClick={() => props.onClick("time-night")}
            >
                <Image src="/assets/icons/night.svg" alt="Night" layout="fill" objectFit="contain" />
            </button>
        </div>
    );
};

export default TimeControls;
