import Toggle from "@/components/Home/Toggle/Toggle";
import { getGame, getGameSlugs } from "@/utils/game";
import { createRun } from "@/utils/run";
import Image from "next/image";
import Router from "next/router";
import { ChangeEvent, useState } from "react";
import styles from "./CreateModal.module.scss";

const CreateModal: React.FC = () => {
    // Form states
    const [name, setName] = useState<string>("");
    const [selectedGame, setSelectedGame] = useState<string>("");
    const [options, setOptions] = useState<{ caps: boolean; dupes: boolean }>({
        caps: false,
        dupes: false,
    });

    // Creates a run in local storage and adds the run to the run list, then redirects
    const handleCreate = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        Router.push(`/runs/${createRun(name, selectedGame, options)}/0`);
    };

    return (
        <div className={styles["create-modal"]}>
            <p className={styles.header}>New Run</p>
            <form className={styles.form} onSubmit={handleCreate}>
                <input
                    className={styles.input}
                    maxLength={30}
                    placeholder="Name your run..."
                    type="text"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    spellCheck={false}
                />
                <div className={styles.games}>
                    {getGameSlugs().map((game: string) => {
                        return (
                            <button
                                className={`${styles.game} ${
                                    game === selectedGame ? styles.active : ""
                                } disable-select`}
                                key={game}
                                type="button"
                                onClick={() => setSelectedGame(game)}
                            >
                                <Image
                                    src={getGame(game).logo}
                                    alt={getGame(game).name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        );
                    })}
                </div>
                <div className={styles.settings}>
                    <div className={styles.toggle}>
                        <div className={styles.main}>
                            <p className={styles.label}>Level Caps</p>
                            <Toggle
                                enabled={options.caps}
                                onToggle={() => setOptions({ ...options, caps: !options.caps })}
                            />
                        </div>
                        <p className={styles.desc}>Show max levels for boss battles</p>
                    </div>
                    <div className={styles.toggle}>
                        <div className={styles.main}>
                            <p className={styles.label}>Dupe Clause</p>
                            <Toggle
                                enabled={options.dupes}
                                onToggle={() => setOptions({ ...options, dupes: !options.dupes })}
                            />
                        </div>
                        <p className={styles.desc}>Allow duplicate encounters</p>
                    </div>
                </div>
                <button className="primary-button" disabled={!name || !selectedGame}>
                    Start!
                </button>
            </form>
        </div>
    );
};

export default CreateModal;
