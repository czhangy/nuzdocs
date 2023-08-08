import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Stat from "@/models/Stat";
import { getNature, isNeutralNature } from "@/utils/natures";
import { Chart } from "chart.js/auto";
import { useEffect } from "react";
import styles from "./SummaryStats.module.scss";

type Props = {
    pokemonData: PokemonData;
    caughtPokemon: CaughtPokemon;
};

const SummaryStats: React.FC<Props> = (props: Props) => {
    // Initialize radar chart on component load
    useEffect(() => {
        if (props.pokemonData) {
            let chartStatus = Chart.getChart("stats");
            if (chartStatus) chartStatus.destroy();
            const stats = {
                labels: props.pokemonData.stats.map((stat: Stat) => `${stat.name}: ${stat.base}`),
                datasets: [
                    {
                        backgroundColor: "rgba(54, 154, 45, 0.5)",
                        borderColor: "rgba(54, 154, 45, 1)",
                        data: props.pokemonData.stats.map((stat: Stat) => stat.base),
                    },
                ],
            };
            const chart = new Chart(document.getElementById("stats") as HTMLCanvasElement, {
                type: "radar",
                data: stats,
                options: {
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
    }, [props.pokemonData]);
    return (
        <div className={styles["summary-stats"]}>
            <p className={styles.header}>Stats</p>
            <div className={styles.stats}>
                {props.caughtPokemon.pokemon.nature ? (
                    <div className={styles.nature}>
                        <div className={styles["nature-header"]}>
                            Nature: <strong>{props.caughtPokemon.pokemon.nature}</strong>
                        </div>
                        {!isNeutralNature(props.caughtPokemon.pokemon.nature) ? (
                            <div className={styles.changes}>
                                <p className={styles.increase}>
                                    ↑{getNature(props.caughtPokemon.pokemon.nature).increase}
                                </p>
                                <p className={styles.decrease}>
                                    ↓{getNature(props.caughtPokemon.pokemon.nature).decrease}
                                </p>
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
                        BST: {props.pokemonData.stats.reduce((bst: number, stat: Stat) => bst + stat.base, 0)}
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
