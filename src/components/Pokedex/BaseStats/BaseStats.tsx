import Stat from "@/models/Stat";
import { Chart } from "chart.js/auto";
import { useEffect } from "react";
import styles from "./BaseStats.module.scss";

type Props = {
    stats: Stat[];
};

const BaseStats: React.FC<Props> = (props: Props) => {
    // Initialize radar chart on component load
    useEffect(() => {
        if (props.stats) {
            let chartStatus = Chart.getChart("stats");
            if (chartStatus) chartStatus.destroy();
            const stats = {
                labels: props.stats.map((stat: Stat) => `${stat.name}: ${stat.base}`),
                datasets: [
                    {
                        backgroundColor: "rgba(54, 154, 45, 0.5)",
                        borderColor: "rgba(54, 154, 45, 1)",
                        data: props.stats.map((stat: Stat) => stat.base),
                    },
                ],
            };
            const chart = new Chart(document.getElementById("stats") as HTMLCanvasElement, {
                type: "radar",
                data: stats,
                options: {
                    animation: false,
                    events: [],
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                        },
                    },
                    scales: {
                        r: {
                            angleLines: {
                                color: "white",
                            },
                            grid: {
                                color: ["white"],
                                lineWidth: 1,
                            },
                            min: 10,
                            max: 180,
                            pointLabels: {
                                color: "white",
                                font: {
                                    family: "'Poppins', sans-serif",
                                    size: 12,
                                    weight: "bold",
                                },
                            },
                            ticks: {
                                display: false,
                                maxTicksLimit: 5,
                                stepSize: 45,
                            },
                        },
                    },
                },
            });
        }
    }, [props.stats]);
    return (
        <div className={styles["summary-stats"]}>
            <p className={styles.header}>Stats</p>
            <div className={styles.stats}>
                <div className={styles.chart}>
                    <p className={styles.bst}>
                        BST: {props.stats.reduce((bst: number, stat: Stat) => bst + stat.base, 0)}
                    </p>
                    <div className={styles.radar}>
                        <canvas id="stats" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseStats;
