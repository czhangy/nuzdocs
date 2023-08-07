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
    ],
    Medium: [
        {
            desc: "Loading occasionally crashes between locations",
            group: "General",
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
    ],
};

export default bugs;
