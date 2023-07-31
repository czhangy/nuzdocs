const colors: { [category: string]: { [identifier: string]: string } } = {
    priorities: {
        High: "#fc4134",
        Medium: "#f3f363",
        Low: "#41b931",
    },
    priorities_svg: {
        High: "invert(40%) sepia(73%) saturate(4694%) hue-rotate(342deg) brightness(101%) contrast(98%",
        Medium: "invert(98%) sepia(88%) saturate(1085%) hue-rotate(337deg) brightness(111%) contrast(91%)",
        Low: "invert(71%) sepia(18%) saturate(1773%) hue-rotate(63deg) brightness(81%) contrast(93%)",
    },
    tiers: {
        S: "#7e59c9",
        A: "#086314",
        B: "#7ec959",
        C: "#e3bf52",
        D: "#db9335",
        F: "#c44343",
        "?": "#111111",
    },
    types: {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
    },
};

export default colors;
