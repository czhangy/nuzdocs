import BattlePreview from "@/components/Battle/BattlePreview/BattlePreview";
import PokemonCard from "@/components/Battle/PokemonCard/PokemonCard";
import Pokemon from "@/models/Pokemon";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getBattle } from "@/utils/battle";
import styles from "./BattlePage.module.scss";

type Props = {
    segment: Segment;
    run: Run;
};

const BattlePage: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["battle-page"]}>
            <BattlePreview segment={props.segment} run={props.run} />
            <ul className={styles.team}>
                {getBattle(props.run.gameSlug, props.segment.slug, props.run.starterSlug).team.map(
                    (pokemon: Pokemon, key: number) => (
                        <PokemonCard pokemon={pokemon} gameSlug={props.run.gameSlug} key={key} />
                    )
                )}
            </ul>
        </div>
    );
};

export default BattlePage;
