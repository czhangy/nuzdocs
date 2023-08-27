const OUT_FILE = "./data/out.json";

const game = process.argv[2];
const fs = require("fs");

const rows = fs.readFileSync(`data/${game}.csv`).toString().split("\r\n");
const battleData = {};

const getTeam = (i, row, team) => {
    const start = i;
    while (i < rows.length && (i === start || row[0] === ",")) {
        // Get Pokemon's JSON
        const attrs = row.split(",");
        const name = attrs[2].toLowerCase();
        const ability = attrs[3].replace(/ /g, "-").toLowerCase();
        const item = attrs[4].replace(/ /g, "-").toLowerCase();
        const level = parseInt(attrs[5]);
        const moves = [];
        for (let j = 6; j <= 9; j++) {
            if (!attrs[j]) {
                break;
            } else {
                moves.push(attrs[j].replace(/ /g, "-").toLowerCase());
            }
        }
        const ivs = {
            hp: parseInt(attrs[10]),
            atk: parseInt(attrs[11]),
            spa: parseInt(attrs[12]),
            def: parseInt(attrs[13]),
            spd: parseInt(attrs[14]),
            spe: parseInt(attrs[15]),
        };

        const pokemon = {
            slug: name,
            species: name,
            level: level,
            ability: ability,
            moves: moves,
            ivs: ivs,
            evs: { hp: 0, atk: 0, spa: 0, def: 0, spd: 0, spe: 0 },
        };
        if (item) {
            pokemon.item = item;
        }
        team.push(pokemon);

        i++;
        row = rows[i];
    }
    return i;
};

const saveBattle = (battleKey, team) => {
    // Skip version exclusives and remove version info from name
    if (game === "sapphire" && battleKey.includes("[Ruby]")) {
        return;
    } else if (game === "ruby" && battleKey.includes("[Sapphire]")) {
        return;
    }
    battleKey = battleKey.replace(/_\[.+?\]/, "");

    // Construct battle object
    const battle = {
        trainer: "[PLACEHOLDER]",
        name: getName(battleKey),
        team: team,
        items: [],
    };

    // Remove invalid chars from key
    battleKey = battleKey
        .replace(/[\{\}\.]/g, "")
        .replace(/\&/, "and")
        .toLowerCase();

    // Handle repeat fights by putting them into an array
    if (battleKey in battleData) {
        if (Array.isArray(battleData[battleKey])) {
            battleData[battleKey].push(battle);
        } else {
            const arr = [battleData[battleKey]];
            arr.push(battle);
            battleData[battleKey] = arr;
        }
    } else {
        battleData[battleKey] = battle;
    }
};

const getName = (battleKey) => {
    const words = battleKey.split("_");
    let name = words.at(-1);
    if (words.includes("&")) {
        const idx = words.indexOf("&");
        name = `${words[idx - 1]} & ${words[idx + 1]}`;
    } else if (words.some((word) => word.startsWith("{"))) {
        const idx = words.findIndex((word) => word.startsWith("{"));
        name = words[idx - 1];
    }
    return name;
};

const handleRepeatFights = () => {
    for ([key, value] of Object.entries(battleData)) {
        if (Array.isArray(value)) {
            let idx = 1;
            for (const battle of value) {
                battleData[`${key}_${idx}`] = battle;
                idx++;
            }
            delete battleData[key];
        }
    }
};

const parse = () => {
    let i = 1;
    while (i < rows.length) {
        // Get trainer key
        let row = rows[i];
        let battleKey = row.substring(0, row.indexOf(",")).replace(/ /g, "_");

        // Iterate over trainer team
        const team = [];
        i = getTeam(i, row, team);

        // Save battle to object
        saveBattle(battleKey, team);
    }

    handleRepeatFights();
    fs.writeFileSync(OUT_FILE, JSON.stringify(battleData, null, 4), "utf-8");
};

parse();
