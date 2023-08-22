import Bug from "@/models/Bug";

const bugs: { [priority: string]: Bug[] } = {
    High: [
        {
            desc: "Encounter data is slightly off (compared to Serebii)",
            group: "General",
        },
        {
            desc: "Headbutt encounters are missing",
            group: "HeartGold/SoulSilver",
            link: "https://github.com/czhangy/nuzlocke-db/issues/25",
        },
        {
            desc: "Refreshing while not on the main run page prevents the navbar from rendering",
            group: "General",
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
            desc: "If a move has been updated, only the most recent set of info is displayed, regardless of what gen the run is",
            group: "General",
        },
        {
            desc: "Pokemon with different forms can evolve between forms (i.e., Zigzagoon/Linoone/Obstagoon)",
            group: "General",
        },
        {
            desc: "Pokemon cannot learn moves from their past forms if they are no longer part of its moveset",
            group: "General",
        },
    ],
    Low: [
        {
            desc: "Accordion arrow icon is loading too slow",
            group: "General",
        },
        {
            desc: "Sprites with negative margins overlap surrounding content",
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
            desc: "Segment pages have extra padding at the bottom when the page is smaller than the screen height",
            group: "General",
        },
        {
            desc: "Static Electrode encounters are missing from Aqua Hideout",
            group: "Emerald",
        },
    ],
};

export default bugs;
