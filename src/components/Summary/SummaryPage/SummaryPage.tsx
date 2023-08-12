import Modal from "@/components/Global/Modal/Modal";
import MoveModal from "@/components/Summary/MoveModal/MoveModal";
import SummaryEvolutions from "@/components/Summary/SummaryEvolutions/SummaryEvolutions";
import SummaryHeader from "@/components/Summary/SummaryHeader/SummaryHeader";
import SummaryInfo from "@/components/Summary/SummaryInfo/SummaryInfo";
import SummaryMoves from "@/components/Summary/SummaryMoves/SummaryMoves";
import SummaryStats from "@/components/Summary/SummaryStats/SummaryStats";
import CaughtPokemon from "@/models/CaughtPokemon";
import NamedResource from "@/models/NamedResource";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import Values from "@/models/Values";
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
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    // Update nickname in local storage
    const handleNicknameUpdate = (nickname: string): void => {
        const newCaughtPokemon: CaughtPokemon = JSON.parse(JSON.stringify(caughtPokemon));
        newCaughtPokemon.nickname = nickname;
        handleUpdate(newCaughtPokemon);
    };

    // Update level in local storage
    const handleLevelUpdate = (level: number): void => {
        const newCaughtPokemon: CaughtPokemon = JSON.parse(JSON.stringify(caughtPokemon));
        newCaughtPokemon.pokemon.level = level;
        handleUpdate(newCaughtPokemon);
    };

    // Update ability in local storage
    const handleAbilityUpdate = (ability: NamedResource): void => {
        const newCaughtPokemon: CaughtPokemon = JSON.parse(JSON.stringify(caughtPokemon));
        newCaughtPokemon.pokemon.ability = ability;
        handleUpdate(newCaughtPokemon);
    };

    // Update nature in local storage
    const handleNatureUpdate = (nature: string): void => {
        const newCaughtPokemon: CaughtPokemon = JSON.parse(JSON.stringify(caughtPokemon));
        newCaughtPokemon.pokemon.nature = nature;
        handleUpdate(newCaughtPokemon);
    };

    // Update moveset in local storage
    const handleMovesetUpdate = (move: NamedResource): void => {
        const newCaughtPokemon: CaughtPokemon = JSON.parse(JSON.stringify(caughtPokemon));
        newCaughtPokemon.pokemon.moves[Math.min(newCaughtPokemon.pokemon.moves.length, selectedIdx!)] = move;
        handleUpdate(newCaughtPokemon);
    };

    // Delete from moveset in local storage
    const handleMovesetDelete = (): void => {
        const newCaughtPokemon: CaughtPokemon = JSON.parse(JSON.stringify(caughtPokemon));
        newCaughtPokemon.pokemon.moves.splice(selectedIdx!, 1);
        handleUpdate(newCaughtPokemon);
    };

    // Update IVs in local storage
    const handleIVUpdate = (ivs: Values): void => {
        const newCaughtPokemon: CaughtPokemon = JSON.parse(JSON.stringify(caughtPokemon));
        newCaughtPokemon.pokemon.ivs = ivs;
        handleUpdate(newCaughtPokemon);
    };

    // Update EVs in local storage
    const handleEVUpdate = (evs: Values): void => {
        const newCaughtPokemon: CaughtPokemon = JSON.parse(JSON.stringify(caughtPokemon));
        newCaughtPokemon.pokemon.evs = evs;
        handleUpdate(newCaughtPokemon);
    };

    // Update Pokemon in local storage
    const handleUpdate = (newPokemon: CaughtPokemon): void => {
        if (isAlive(props.run.id, newPokemon.id)) {
            const idx: number = getBox(props.run.id)
                .map((cp: CaughtPokemon) => cp.id)
                .indexOf(newPokemon.id);
            updateBox(props.run.id, newPokemon, idx);
        } else {
            const updateIdx: number = getRIPs(props.run.id)
                .map((cp: CaughtPokemon) => cp.id)
                .indexOf(newPokemon.id);
            updateRIPs(props.run.id, newPokemon, updateIdx);
        }
        setCaughtPokemon(newPokemon);
        setSelectedIdx(null);
        setMoveModalOpen(false);
    };

    // Pass move selection info to MoveModal
    const handleMoveSelect = (idx: number): void => {
        setSelectedIdx(idx);
        setMoveModalOpen(true);
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
                onUpdate={(nickname: string) => handleNicknameUpdate(nickname)}
            />
            <SummaryInfo
                caughtPokemon={caughtPokemon}
                pokemonData={pokemonData}
                game={props.run.gameSlug}
                onLevelUpdate={(level: number) => handleLevelUpdate(level)}
                onAbilityUpdate={(ability: NamedResource) => handleAbilityUpdate(ability)}
                onNatureUpdate={(nature: string) => handleNatureUpdate(nature)}
            />
            <SummaryMoves
                caughtPokemon={caughtPokemon}
                types={pokemonData.types}
                game={props.run.gameSlug}
                onClick={(idx: number) => handleMoveSelect(idx)}
            />
            <SummaryStats
                pokemon={pokemonData}
                set={caughtPokemon}
                onIVUpdate={(ivs: Values) => handleIVUpdate(ivs)}
                onEVUpdate={(evs: Values) => handleEVUpdate(evs)}
            />
            <SummaryEvolutions pokemon={pokemonData} gameSlug={props.run.gameSlug} />
            <Modal modalID="move-modal" open={moveModalOpen} onClose={() => setMoveModalOpen(false)}>
                {selectedIdx !== null ? (
                    <MoveModal
                        movepool={pokemonData.movepool}
                        moves={caughtPokemon.pokemon.moves.map((move: NamedResource) => move.slug)}
                        move={
                            selectedIdx < caughtPokemon.pokemon.moves.length
                                ? caughtPokemon.pokemon.moves[selectedIdx].name
                                : null
                        }
                        onConfirm={(move: NamedResource) => handleMovesetUpdate(move)}
                        onDelete={handleMovesetDelete}
                        onClose={() => setMoveModalOpen(false)}
                    />
                ) : (
                    ""
                )}
            </Modal>
        </div>
    ) : (
        <div className={styles["summary-page"]}>
            <p>Loading...</p>
        </div>
    );
};

export default SummaryPage;
