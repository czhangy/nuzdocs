import Bug from "@/models/Bug";

const bugs: { [priority: string]: Bug[] } = {
    High: [
        {
            desc: "Encounter data is slightly wrong",
            group: "General",
        },
        {
            desc: "Headbutt encounters are missing",
            group: "HeartGold/SoulSilver",
            link: "https://github.com/czhangy/nuzlocke-db/issues/25",
        },
        {
            desc: "The encounter display covers information if the location page is taller than the screen height",
            group: "General",
        },
        {
            desc: "Underwater encounters display as part of their routes, not in the underwater location",
            group: "Emerald",
        },
    ],
    Medium: [
        {
            desc: "Loading occasionally crashes between locations",
            group: "General",
        },
        {
            desc: "Pokemon with regional forms show up in all games' evolutions, even when not accessible",
            group: "General",
        },
        {
            desc: "Pokemon with different forms can evolve between forms (i.e., Zigzagoon/Linoone/Obstagoon)",
            group: "General",
        },
        {
            desc: "Pokemon cannot learn moves from their past evolutions if they are no longer part of its moveset",
            group: "General",
        },
        {
            desc: "Pokemon abilities carry through when they evolve, even when they can no longer have that abiilty",
            group: "General",
        },
    ],
    Low: [
        {
            desc: "Accordion arrow icon is loading too slow",
            group: "General",
        },
        {
            desc: "Damaging moves with no BP (ex: Grass Knot) don't display a STAB bonus",
            group: "General",
        },
        {
            desc: "Some tooltips overflow the screen on mobile",
            group: "General",
        },
        {
            desc: "The nickname container doesn't resize when changing the screen size past the font-change breakpoint",
            group: "General",
        },
        {
            desc: "Static Electrode encounters are missing from Aqua Hideout",
            group: "Emerald",
        },
    ],
};

export default bugs;
