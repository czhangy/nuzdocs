const OUT_FILE = "./data/out.json";

const game = process.argv[2];
const fs = require("fs");

const rows = fs.readFileSync(`data/${game}.csv`).toString().split("\r\n");
const battleData = {};

const toSlug = (name) => {
    return name.replace(/ /g, "-").toLowerCase();
};

const getTeam = (i, row, team) => {
    const start = i;
    while (i < rows.length && (i === start || row[0] === ",")) {
        // Get Pokemon's JSON
        const attrs = row.split(",");
        const name = attrs[4].toLowerCase();
        const level = parseInt(attrs[7]);
        const moves = [];
        for (let j = 8; j <= 11; j++) {
            if (!attrs[j]) {
                break;
            } else {
                moves.push({ slug: toSlug(attrs[j]), name: attrs[j] });
            }
        }
        const iv = Math.floor((parseInt(attrs[12]) * 31) / 255);
        const ivs = {
            hp: iv,
            atk: iv,
            spa: iv,
            def: iv,
            spd: iv,
            spe: iv,
        };
        const pokemon = {
            slug: name,
            species: name,
            level: level,
            ability: { slug: toSlug(attrs[5]), name: attrs[5] },
            moves: moves,
            ivs: ivs,
            evs: { hp: 0, atk: 0, spa: 0, def: 0, spd: 0, spe: 0 },
        };
        if (attrs[6]) {
            pokemon.item = { slug: toSlug(attrs[6]), name: attrs[6] };
        }
        team.push(pokemon);

        i++;
        row = rows[i];
    }
    return i;
};

const saveBattle = (battleKey, row, team) => {
    const attrs = row.split(",");
    battleKey = battleKey.replace(/_\[.+?\]/, "");

    // Remove condition from name
    let name = attrs[1];
    if (name.includes("{")) {
        name = name.substring(0, name.indexOf("{") - 1);
    }

    // Construct battle object
    const battle = {
        trainer: `{[trainers.${attrs[0]}]}`,
        name: name,
        location: attrs[2],
        team: team,
        items: [],
    };

    // If the battle uses items, parse/set items
    if (attrs[3]) {
        const count = attrs[3].substring(attrs[3].indexOf("[") + 1, attrs[3].indexOf("]"));
        for (let i = 0; i < count; i++) {
            battle.items.push(toSlug(attrs[3].substring(attrs[3].indexOf(" ") + 1)));
        }
    }

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
        const attrs = row.split(",");

        // Create key using Trainer + Name
        let battleKey = attrs[0] + "_" + attrs[1].toLowerCase().replace(/\s/g, "_");
        const words = battleKey.split("_");

        // Remove the game group from the key
        words.shift();

        // Remove stuff like brendan_brendan
        if (words[0] === words[1]) {
            words.shift();
        }

        battleKey = words.join("_");

        // Iterate over trainer team
        const team = [];
        i = getTeam(i, row, team);

        // Save battle to object
        saveBattle(battleKey, row, team);
    }

    handleRepeatFights();
    fs.writeFileSync(OUT_FILE, JSON.stringify(battleData, null, 4), "utf-8");
};

parse();
