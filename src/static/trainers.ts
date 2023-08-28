import Trainer from "@/models/Trainer";

const trainers: { [trainerSlug: string]: Trainer } = {
    rse_archie: {
        class: "Aqua Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/archie-gen3.png",
    },
    rse_aroma_lady: {
        class: "Aroma Lady",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/aromalady-gen3rs.png",
    },
    rse_battle_girl: {
        class: "Battle Girl",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/battlegirl-gen3.png",
    },
    rse_beauty: {
        class: "Beauty",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/beauty-gen3rs.png",
    },
    rse_bird_keeper: {
        class: "Bird Keeper",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/birdkeeper-gen3rs.png",
    },
    rse_black_belt: {
        class: "Black Belt",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/blackbelt-gen3rs.png",
    },
    rse_brawly: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/brawly-gen3.png",
    },
    rse_bug_catcher: {
        class: "Bug Catcher",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/bugcatcher-gen3rs.png",
    },
    rse_bug_maniac: {
        class: "Bug Maniac",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/bugmaniac-gen3.png",
    },
    rse_camper: {
        class: "Camper",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/camper-gen3rs.png",
    },
    rse_collector: {
        class: "Collector",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/collector-gen3.png",
    },
    rse_cool_trainer_f: {
        class: "Cool Trainer",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/acetrainerf-gen3rs.png",
    },
    rse_cool_trainer_m: {
        class: "Cool Trainer",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/acetrainer-gen3rs.png",
    },
    rse_courtney: {
        class: "Magma Admin",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/courtney-gen3.png",
    },
    rse_drake: {
        class: "Elite Four",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/drake-gen3.png",
    },
    rse_dragon_tamer: {
        class: "Dragon Tamer",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/dragontamer-gen3.png",
    },
    rse_expert_f: {
        class: "Expert",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/expertf-gen3.png",
    },
    rse_expert_m: {
        class: "Expert",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/expert-gen3.png",
    },
    rse_fisherman: {
        class: "Fisherman",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/fisherman-gen3rs.png",
    },
    rse_flannery: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/flannery-gen3.png",
    },
    rse_gentleman: {
        class: "Gentleman",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/gentleman-gen3rs.png",
    },
    rse_glacia: {
        class: "Elite Four",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/glacia-gen3.png",
    },
    rse_guitarist: {
        class: "Guitarist",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/guitarist-gen3.png",
    },
    rse_hex_maniac: {
        class: "Hex Maniac",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/hexmaniac-gen3.png",
    },
    rse_hiker: {
        class: "Hiker",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/hiker-gen3rs.png",
    },
    rse_interviewers: {
        class: "Interviewers",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/interviewers-gen3.png",
    },
    rse_kindler: {
        class: "Kindler",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/kindler-gen3.png",
    },
    rse_lady: {
        class: "Lady",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/lady-gen3rs.png",
    },
    rse_lass: {
        class: "Lass",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/lass-gen3rs.png",
    },
    rse_matt: {
        class: "Aqua Admin",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/matt-gen3.png",
    },
    rse_maxie: {
        class: "Magma Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/maxie-gen3.png",
    },
    rse_ninja_boy: {
        class: "Ninja Boy",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/ninjaboy-gen3.png",
    },
    rse_norman: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/norman-gen3.png",
    },
    rse_parasol_lady: {
        class: "Parasol Lady",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/parasollady-gen3.png",
    },
    rse_phoebe: {
        class: "Elite Four",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/phoebe-gen3.png",
    },
    rse_picnicker: {
        class: "Picnicker",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/picnicker-gen3rs.png",
    },
    rse_pokefan_f: {
        class: "PokéFan",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/pokefanf-gen3.png",
    },
    rse_pokefan_m: {
        class: "PokéFan",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/pokefan-gen3.png",
    },
    rse_pokemaniac: {
        class: "PokéManiac",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/pokemaniac-gen3rs.png",
    },
    rse_pokemon_breeder_f: {
        class: "Pokémon Breeder",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/pokemonbreederf-gen3.png",
    },
    rse_pokemon_breeder_m: {
        class: "Pokémon Breeder",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/pokemonbreeder-gen3.png",
    },
    rse_pokemon_ranger_f: {
        class: "Pokémon Ranger",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/pokemonrangerf-gen3rs.png",
    },
    rse_pokemon_ranger_m: {
        class: "Pokémon Ranger",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/pokemonranger-gen3rs.png",
    },
    rse_psychic_f: {
        class: "Psychic",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/psychicf-gen3rs.png",
    },
    rse_psychic_m: {
        class: "Psychic",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/psychic-gen3rs.png",
    },
    rse_rich_boy: {
        class: "Rich Boy",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/richboy-gen3.png",
    },
    rse_roxanne: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/roxanne-gen3.png",
    },
    rse_ruin_maniac: {
        class: "Ruin Maniac",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/ruinmaniac-gen3rs.png",
    },
    rse_sailor: {
        class: "Sailor",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/sailor-gen3rs.png",
    },
    rse_school_kid_f: {
        class: "School Kid",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/schoolkidf-gen3.png",
    },
    rse_school_kid_m: {
        class: "School Kid",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/schoolkid-gen3.png",
    },
    rse_shelly: {
        class: "Aqua Admin",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/shelly-gen3.png",
    },
    rse_sidney: {
        class: "Elite Four",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/sidney-gen3.png",
    },
    rse_sis_and_bro: {
        class: "Sis and Bro",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/sisandbro-gen3rs.png",
    },
    rse_sr_and_jr: {
        class: "Sr. and Jr.",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/srandjr-gen3.png",
    },
    rse_swimmer_f: {
        class: "Swimmer",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/swimmerf-gen3rs.png",
    },
    rse_swimmer_m: {
        class: "Swimmer",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/swimmerm-gen3rs.png",
    },
    rse_tabitha: {
        class: "Magma Admin",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/tabitha-gen3.png",
    },
    rse_tate_and_liza: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/tateandliza-gen3.png",
    },
    rse_team_aqua_f: {
        class: "Team Aqua",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/teamaquagruntf-gen3.png",
    },
    rse_team_aqua_m: {
        class: "Team Aqua",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/teamaquagruntm-gen3.png",
    },
    rse_team_magma_f: {
        class: "Team Magma",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/teammagmagruntf-gen3.png",
    },
    rse_team_magma_m: {
        class: "Team Magma",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/teammagmagruntm-gen3.png",
    },
    rse_triathlete_biker_f: {
        class: "Triathlete",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/triathletebikerf-gen3.png",
    },
    rse_triathlete_biker_m: {
        class: "Triathlete",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/triathletebikerm-gen3.png",
    },
    rse_triathlete_runner_f: {
        class: "Triathlete",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/triathleterunnerf-gen3.png",
    },
    rse_triathlete_runner_m: {
        class: "Triathlete",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/triathleterunnerm-gen3.png",
    },
    rse_triathlete_swimmer_f: {
        class: "Triathlete",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/triathleteswimmerf-gen3.png",
    },
    rse_triathlete_swimmer_m: {
        class: "Triathlete",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/triathleteswimmerm-gen3.png",
    },
    rse_tuber_f: {
        class: "Tuber",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/tuberf-gen3rs.png",
    },
    rse_tuber_m: {
        class: "Tuber",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/tuber-gen3.png",
    },
    rse_twins: {
        class: "Twins",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/twins-gen3rs.png",
    },
    rse_youngster: {
        class: "Youngster",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/youngster-gen3rs.png",
    },
    rse_wally: {
        class: "Pokémon Trainer",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/wally-gen3.png",
    },
    rse_wattson: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/wattson-gen3.png",
    },
    rse_winona: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/winona-gen3.png",
    },
    rse_young_couple: {
        class: "Young Couple",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/youngcouple-gen3rs.png",
    },
    rs_brendan: {
        class: "Pokémon Trainer",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/brendan-gen3rs.png",
    },
    rs_may: {
        class: "Pokémon Trainer",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/may-gen3rs.png",
    },
    rs_steven: {
        class: "Champion",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/steven-gen3.png",
    },
    rs_wallace: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/wallace-gen3rs.png",
    },
    emerald_juan: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/juan-gen3.png",
    },
    emerald_may: {
        class: "Pokémon Trainer",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/may-gen3.png",
    },
    emerald_wallace: {
        class: "Champion",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/wallace-gen3.png",
    },
    hgss_silver: {
        class: "Rival",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/silver.png",
    },
    hgss_falkner: {
        class: "Gym Leader",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/falkner.png",
    },
    hgss_elder_li: {
        class: "Elder",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/li.png",
    },
};

export default trainers;
