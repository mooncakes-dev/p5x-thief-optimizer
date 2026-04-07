import type { IWeapon } from "$lib/models/Thief";
import { resolveAssetImage } from "$lib/utils/card-utils";

export const WEAPONS = [
    {
        name: 'Phoenix Dagger',
        rarity: 5,
        image: resolveAssetImage('phoenix_dagger.png', 'weapons') ?? '',
        lvl: 0,
        forgeLvl: 0,
        hp: 2160,
        atk: 780,
        def: 370
    },
    {
        name: 'Machete',
        rarity: 4,
        image: resolveAssetImage('machete.png', 'weapons') ?? '',
        lvl: 0,
        forgeLvl: 0,
        hp: 1729,
        atk: 623,
        def: 296
    },
    {
        name: 'Royal Étoile',
        rarity: 5,
        image: resolveAssetImage('royal_etoile.png', 'weapons') ?? '',
        lvl: 0,
        forgeLvl: 0,
        hp: 2240,
        atk: 766,
        def: 370
    },
    {
        name: 'Divine Sword of Sinai',
        rarity: 4,
        image: resolveAssetImage('divine_sword_of_sinai.png', 'weapons') ?? '',
        lvl: 0,
        forgeLvl: 0,
        hp: 1792,
        atk: 613,
        def: 296
    },
] as const satisfies readonly IWeapon[];