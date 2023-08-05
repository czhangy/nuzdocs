import styles from "./LocationOverview.module.scss";
import Link from "next/link";

type Props = {
    locationName: string;
    locationSlug: string;
    runName: string;
};

const LocationOverview: React.FC<Props> = (props: Props) => {
    return props.runName ? (
        <div className={styles["location-overview"]}>
            <p className={styles.location}></p>
        </div>
    ) : (
        <div className={styles["location-overview"]}>
            <p className={styles.location}>Loading...</p>
        </div>
    );
};

export default LocationOverview;
