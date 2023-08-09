import Modal from "@/components/Global/Modal/Modal";
import MoveModal from "@/components/Summary/MoveModal/MoveModal";
import SummaryEvolutions from "@/components/Summary/SummaryEvolutions/SummaryEvolutions";
import SummaryHeader from "@/components/Summary/SummaryHeader/SummaryHeader";
import SummaryInfo from "@/components/Summary/SummaryInfo/SummaryInfo";
import SummaryMoves from "@/components/Summary/SummaryMoves/SummaryMoves";
import SummaryStats from "@/components/Summary/SummaryStats/SummaryStats";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { fetchPokemon } from "@/utils/api";
import { getBox, getRIPs, getRun, isAlive, updateBox, updateRIPs } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./SummaryPage.module.scss";

type Props = {
    run: Run;
    pokemonID: string;
};

const SummaryPage: React.FC<Props> = (props: Props) => {
    // Internal state
    const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon | null>(null);

    // Fetched data state
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

    // Component state
    const [moveModalOpen, setMoveModalOpen] = useState<boolean>(false);

    // Get Pokemon from local storage
    const handleUpdate = (selection: string | number, property: string, isNested: boolean = true): void => {
        const newCaughtPokemon: CaughtPokemon = JSON.parse(JSON.stringify(caughtPokemon));
        if (isNested) {
            //@ts-expect-error
            newCaughtPokemon.pokemon[property] = selection;
        } else {
            //@ts-expect-error
            newCaughtPokemon[property] = selection;
        }
        if (isAlive(props.run.id, newCaughtPokemon.id)) {
            const idx: number = getBox(props.run.id)
                .map((cp: CaughtPokemon) => cp.id)
                .indexOf(newCaughtPokemon.id);
            updateBox(props.run.id, newCaughtPokemon, idx);
        } else {
            const updateIdx: number = getRIPs(props.run.id)
                .map((cp: CaughtPokemon) => cp.id)
                .indexOf(newCaughtPokemon.id);
            updateRIPs(props.run.id, newCaughtPokemon, updateIdx);
        }
        setCaughtPokemon(newCaughtPokemon);
    };

    // Find Pokemon on page load
    useEffect(() => {
        if (props.run && props.pokemonID.length) {
            const pokemonList: CaughtPokemon[] = isAlive(props.run.id, props.pokemonID)
                ? getRun(props.run.id).box
                : getRun(props.run.id).rips;
            const caughtPokemon: CaughtPokemon = pokemonList.find(
                (pokemon: CaughtPokemon) => pokemon.id === props.pokemonID
            )!;
            setCaughtPokemon(caughtPokemon);
            fetchPokemon(caughtPokemon.pokemon.slug, props.run.gameSlug).then((pokemon: PokemonData) =>
                setPokemonData(pokemon)
            );
        }
    }, [props.run, props.pokemonID]);

    return caughtPokemon && pokemonData ? (
        <div className={styles["summary-page"]}>
            <SummaryHeader
                caughtPokemon={caughtPokemon}
                pokemonData={pokemonData}
                run={props.run}
                onUpdate={handleUpdate}
            />
            <SummaryInfo caughtPokemon={caughtPokemon} pokemonData={pokemonData} onUpdate={handleUpdate} />
            <SummaryMoves
                caughtPokemon={caughtPokemon}
                pokemonData={pokemonData}
                onClick={() => setMoveModalOpen(true)}
            />
            <SummaryStats stats={pokemonData.stats} nature={caughtPokemon.pokemon.nature} />
            <SummaryEvolutions pokemon={pokemonData} gameSlug={props.run.gameSlug} />
            <Modal modalID="move-modal" open={moveModalOpen} onClose={() => setMoveModalOpen(false)}>
                <MoveModal />
            </Modal>
        </div>
    ) : (
        <div className={styles["summary-page"]}>
            <p>Loading...</p>
        </div>
    );
};

export default SummaryPage;
