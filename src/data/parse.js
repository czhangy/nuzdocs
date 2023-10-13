const OUT_FILE = "./data/out.json";
const TRAINER = 0;
const NAME = 1;
const LOCATION = 2;
const ITEMS = 3;
const REQUIRED = 4;
const DOUBLE = 5;
const POKEMON = 6;
const ABILITY = 7;
const HELD_ITEM = 8;
const LEVEL = 9;
const MOVE_1 = 10;
const MOVE_4 = 13;
const IV = 14;

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
        const name = attrs[POKEMON].toLowerCase();
        const level = parseInt(attrs[LEVEL]);
        const moves = [];
        for (let j = MOVE_1; j <= MOVE_4 && attrs[j] !== "~"; j++) {
            moves.push({ slug: toSlug(attrs[j]), name: attrs[j] });
        }
        const iv = Math.floor((parseInt(attrs[IV]) * 31) / 255);
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
            ability: { slug: toSlug(attrs[ABILITY]), name: attrs[ABILITY] },
            moves: moves,
            ivs: ivs,
            evs: { hp: 0, atk: 0, spa: 0, def: 0, spd: 0, spe: 0 },
        };
        if (attrs[HELD_ITEM]) {
            pokemon.item = { slug: toSlug(attrs[HELD_ITEM]), name: attrs[HELD_ITEM] };
        }
        team.push(pokemon);

        i++;
        row = rows[i];
    }
    return i;
};

const saveBattle = (battleKey, row, team) => {
    const attrs = row.split(",");

    // Remove condition from name
    let name = attrs[NAME];
    if (name.includes("{")) {
        name = name.substring(0, name.indexOf("{") - 1);
    }

    // Construct battle object
    const battle = {
        trainer: `{[trainers.${attrs[TRAINER]}]}`,
        name: name,
        location: attrs[LOCATION],
        team: team,
        items: {},
        tags: [],
    };

    // If the battle uses items, parse/set items
    if (attrs[ITEMS]) {
        const item = toSlug(attrs[ITEMS].substring(attrs[ITEMS].indexOf(" ") + 1));
        const count = attrs[ITEMS].substring(attrs[ITEMS].indexOf("[") + 1, attrs[ITEMS].indexOf("]"));
        battle.items[item] = parseInt(count);
    }

    // Check for tags
    if (attrs[REQUIRED] === "y") {
        battle.tags.push("Required");
    }
    if (attrs[DOUBLE] === "y") {
        battle.tags.push("Double Battle");
    }

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
    // Skip headers
    let i = 2;
    while (i < rows.length) {
        // Get trainer key
        let row = rows[i];
        const attrs = row.split(",");

        // Create key using Trainer + Name
        let battleKey = attrs[TRAINER];

        // Handle cases like maxie_and_tabitha_maxie_and_tabitha
        const name = attrs[NAME].replace(/[\{\}\.]/g, "")
            .replace(/\&/, "and")
            .replace(/\s/g, "_")
            .toLowerCase();
        if (!battleKey.endsWith(name)) {
            battleKey += "_" + name;
        }

        // Split key by word
        const words = battleKey.split("_");

        // Remove the game group from the key
        words.shift();

        // Remove stuff like brendan_brendan
        if (words.at(-2) === words.at(-1)) {
            words.pop();
        }
        if (words[0] === words[1]) {
            words.shift();
        }

        // Rejoin into string
        battleKey = words.join("_");

        // Iterate over trainer team
        const team = [];
        i = getTeam(i, row, team);

        // Save battle to object
        saveBattle(battleKey, row, team);
    }

    handleRepeatFights();
    fs.writeFileSync(OUT_FILE, JSON.stringify(battleData).replace(/"\{\[|\]\}"/g, ""), "utf-8");
};

parse();
