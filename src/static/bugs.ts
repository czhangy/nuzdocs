import Bug from "@/models/Bug";

const bugs: { [priority: string]: Bug[] } = {
    High: [
        {
            desc: "Encounter conditions are blowing up",
            group: "HeartGold/SoulSilver",
        },
        {
            desc: "Headbutt encounters are missing",
            group: "HeartGold/SoulSilver",
            link: "https://github.com/czhangy/nuzlocke-db/issues/25",
        },
    ],
    Low: [
        {
            desc: "Accordion arrow icon is loading too slow",
            group: "General",
        },
        {
            desc: "Navigation on segment pages exposes itself by overlapping segment names",
            group: "General",
        },
        {
            desc: "Sprites with negative margins overlap surrounding content",
            group: "General",
        },
        {
            desc: "Pokémon with forms can crash API calls",
            group: "General",
        },
        {
            desc: "Pokémon with forms may cause 500 error codes",
            group: "General",
        },
        {
            desc: "Pokémon with forms only exist in their default forms",
            group: "General",
        },
    ],
};

export default bugs;
