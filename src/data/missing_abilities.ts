import { Descriptions } from "@prisma/client";

const missingAbilities: { [ability: string]: Descriptions[] } = {
    "lingering-aroma": [
        { desc: "Contact with the Pokémon changes the attacker's Ability to Lingering Aroma.", group: 18 },
    ],
    "seed-sower": [{ desc: "Turns the ground into Grassy Terrain when the Pokémon is hit by an attack.", group: 18 }],
    "thermal-exchange": [
        {
            desc: "Boosts the Attack stat when the Pokémon is hit by a Fire-type move. The Pokémon also cannot be burned.",
            group: 18,
        },
    ],
    "anger-shell": [
        {
            desc: "When an attack causes its HP to drop to half or less, the Pokémon gets angry. This lowers its Defense and Sp. Def stats but boosts its Attack, Sp. Atk, and Speed stats.",
            group: 18,
        },
    ],
    "purifying-salt": [
        {
            desc: "The Pokémon's pure salt protects it from status conditions and halves the damage taken from Ghost-type moves.",
            group: 18,
        },
    ],
    "well-baked-body": [
        {
            desc: "The Pokémon takes no damage when hit by Fire-type moves. Instead, its Defense stat is sharply boosted.",
            group: 18,
        },
    ],
    "wind-rider": [
        {
            desc: "Boosts the Pokémon's Attack stat if Tailwind takes effect or if the Pokémon is hit by a wind move. The Pokémon also takes no damage from wind moves.",
            group: 18,
        },
    ],
    "guard-dog": [
        {
            desc: "Boosts the Pokémon’s Attack stat if intimidated. Moves and items that would force the Pokémon to switch out also fail to work.",
            group: 18,
        },
    ],
    "rocky-payload": [{ desc: "Powers up Rock-type moves.", group: 18 }],
    "wind-power": [
        {
            desc: "The Pokémon becomes charged when it is hit by a wind move, boosting the power of the next Electric-type move the Pokémon uses.",
            group: 18,
        },
    ],
    "zero-to-hero": [{ desc: "The Pokémon transforms into its Hero Form when it switches out.", group: 18 }],
    commander: [
        {
            desc: "When the Pokémon enters a battle, it goes inside the mouth of an ally Dondozo if one is on the field. The Pokémon then issues commands from there.",
            group: 18,
        },
    ],
    electromorphosis: [
        {
            desc: "The Pokémon becomes charged when it takes damage, boosting the power of the next Electric-type move the Pokémon uses.",
            group: 18,
        },
    ],
    protosynthesis: [
        {
            desc: "Boosts the Pokémon's most proficient stat in harsh sunlight or if the Pokémon is holding Booster Energy.",
            group: 18,
        },
    ],
    "quark-drive": [
        {
            desc: "Boosts the Pokémon's most proficient stat on Electric Terrain or if the Pokémon is holding Booster Energy.",
            group: 18,
        },
    ],
    "good-as-gold": [
        {
            desc: "A body of pure, solid gold gives the Pokémon full immunity to other Pokémon's status moves.",
            group: 18,
        },
    ],
    "vessel-of-ruin": [
        {
            desc: "The power of the Pokémon's ruinous vessel lowers the Sp. Atk stats of all Pokémon except itself.",
            group: 18,
        },
    ],
    "sword-of-ruin": [
        {
            desc: "The power of the Pokémon's ruinous sword lowers the Defense stats of all Pokémon except itself.",
            group: 18,
        },
    ],
    "tablets-of-ruin": [
        {
            desc: "The power of the Pokémon's ruinous wooden tablets lowers the Attack stats of all Pokémon except itself.",
            group: 18,
        },
    ],
    "beads-of-ruin": [
        {
            desc: "The power of the Pokémon's ruinous beads lowers the Sp. Def stats of all Pokémon except itself.",
            group: 18,
        },
    ],
    "orichalcum-pulse": [
        {
            desc: "Turns the sunlight harsh when the Pokémon enters a battle. The ancient pulse thrumming through the Pokémon also boosts its Attack stat in harsh sunlight.",
            group: 18,
        },
    ],
    "hadron-engine": [
        {
            desc: "Turns the ground into Electric Terrain when the Pokémon enters a battle. The futuristic engine within the Pokémon also boosts its Sp. Atk stat on Electric Terrain.",
            group: 18,
        },
    ],
    opportunist: [
        {
            desc: "If an opponent's stat is boosted, the Pokémon seizes the opportunity to boost the same stat for itself.",
            group: 18,
        },
    ],
    "cud-chew": [
        {
            desc: "When the Pokémon eats a Berry, it will regurgitate that Berry at the end of the next turn and eat it one more time.",
            group: 18,
        },
    ],
    sharpness: [{ desc: "Powers up slicing moves.", group: 18 }],
    "supreme-overlord": [
        {
            desc: "When the Pokémon enters a battle, its Attack and Sp. Atk stats are slightly boosted for each of the allies in its party that have already been defeated.",
            group: 18,
        },
    ],
    costar: [{ desc: "When the Pokémon enters a battle, it copies an ally's stat changes.", group: 18 }],
    "toxic-debris": [
        {
            desc: "Scatters poison spikes at the feet of the opposing team when the Pokémon takes damage from physical moves.",
            group: 18,
        },
    ],
    "armor-tail": [
        {
            desc: "The mysterious tail covering the Pokémon's head makes opponents unable to use priority moves against the Pokémon or its allies.",
            group: 18,
        },
    ],
    "earth-eater": [
        { desc: "If hit by a Ground-type move, the Pokémon has its HP restored instead of taking damage.", group: 18 },
    ],
    "mycelium-might": [
        {
            desc: "The Pokémon will always act more slowly when using status moves, but these moves will be unimpeded by the Ability of the target.",
            group: 18,
        },
    ],
    "minds-eye": [
        {
            desc: "The Pokémon ignores changes to opponents' evasiveness, its accuracy can't be lowered, and it can hit Ghost types with Normal- and Fighting-type moves.",
            group: 18,
        },
    ],
    "supersweet-syrup": [
        {
            desc: "A sickly sweet scent spreads across the field the first time the Pokémon enters a battle, lowering the evasiveness of opposing Pokémon.",
            group: 18,
        },
    ],
    hospitality: [
        {
            desc: "When the Pokémon enters a battle, it showers its ally with hospitality, restoring a small amount of the ally's HP.",
            group: 18,
        },
    ],
    "toxic-chain": [
        {
            desc: "The power of the Pokémon's toxic chain may badly poison any target the Pokémon hits with a move.",
            group: 18,
        },
    ],
    "embody-aspect": [
        {
            desc: "The Pokémon's heart fills with memories, causing its mask to shine and one of the Pokémon's stats to be boosted.",
            group: 18,
        },
    ],
};

export default missingAbilities;
