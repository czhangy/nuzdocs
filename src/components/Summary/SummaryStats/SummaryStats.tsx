import Stat from "@/models/Stat";
import { getNature, isNeutralNature } from "@/utils/natures";
import { Chart } from "chart.js/auto";
import { useEffect } from "react";
import styles from "./SummaryStats.module.scss";

type Props = {
    stats: Stat[];
    nature: string | undefined;
};

const SummaryStats: React.FC<Props> = (props: Props) => {
    // Calculate the base stat, taking nature into account
    const getBaseStat = (stat: Stat): number => {
        if (props.nature) {
            if (getNature(props.nature).increase === stat.name) {
                return Math.floor(stat.base * 1.1);
            } else if (getNature(props.nature).decrease === stat.name) {
                return Math.floor(stat.base * 0.9);
            }
        }
        return stat.base;
    };

    // Initialize radar chart on component load
    useEffect(() => {
        if (props.stats) {
            let chartStatus = Chart.getChart("stats");
            if (chartStatus) chartStatus.destroy();
            const stats = {
                labels: props.stats.map((stat: Stat) => `${stat.name}: ${getBaseStat(stat)}`),
                datasets: [
                    {
                        backgroundColor: "rgba(54, 154, 45, 0.5)",
                        borderColor: "rgba(54, 154, 45, 1)",
                        data: props.stats.map((stat: Stat) => getBaseStat(stat)),
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
                                color: (ctx) => {
                                    if (props.nature) {
                                        const label: string = ctx.label.substring(0, ctx.label.indexOf(":"));
                                        if (label === getNature(props.nature).increase) {
                                            return "#369a2d";
                                        } else if (label === getNature(props.nature).decrease) {
                                            return "red";
                                        }
                                    }
                                    return "white";
                                },
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
    }, [props.stats, props.nature]);
    return (
        <div className={styles["summary-stats"]}>
            <p className={styles.header}>Stats</p>
            <div className={styles.stats}>
                {props.nature ? (
                    <div className={styles.nature}>
                        <div className={styles["nature-header"]}>
                            Nature: <strong>{props.nature}</strong>
                        </div>
                        {!isNeutralNature(props.nature) ? (
                            <div className={styles.changes}>
                                <p className={styles.increase}>↑{getNature(props.nature).increase}</p>
                                <p className={styles.decrease}>↓{getNature(props.nature).decrease}</p>
                            </div>
                        ) : (
                            <div className={styles.changes}>
                                <p className={styles.neutral}>Neutral</p>
                            </div>
                        )}
                    </div>
                ) : (
                    ""
                )}
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

export default SummaryStats;
