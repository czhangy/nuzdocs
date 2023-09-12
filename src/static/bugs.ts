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
            desc: "Pokemon cannot learn moves from their past evolutions if they are no longer part of its moveset",
            group: "General",
        },
        {
            desc: "There's currently no way to detect if a Pokemon has a non-hidden ability that is only available in later generations",
            group: "General",
        },
    ],
    Low: [
        {
            desc: "Accordion arrow icon is loading too slow",
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
        {
            desc: "Location pages have excess height on mobile displays",
            group: "General",
        },
        {
            desc: "Too much page spacing in LocationPage when a custom location is loaded",
            group: "General",
        },
        {
            desc: "Devon Scope encounter percentages exceed 100%",
            group: "Ruby/Sapphire",
        },
        {
            desc: "Road => Route translations for areas are buggy",
            group: "General",
        },
        {
            desc: "EncounterDisplay overlay does not overlap the footer",
            group: "General",
        },
    ],
};

export default bugs;
