import Bug from "@/models/Bug";

const bugs: { [priority: string]: Bug[] } = {
    Medium: [
        {
            desc: "Headbutt encounters are missing",
            group: "HeartGold/SoulSilver",
            link: "https://github.com/czhangy/nuzlocke-db/issues/25",
        },
    ],
};

export default bugs;
