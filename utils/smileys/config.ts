import { IconDefinition } from '@fortawesome/pro-regular-svg-icons'

export type Rarity = 'Crap' | 'Normal' | 'Rare' | 'Epic' | 'Legendary'

export const config: { [key in Rarity]: { min: number, max: number, occurrence: number }} = {
    Crap: {
        occurrence: 5,
        min: 1,
        max: 3
    },
    Normal: {
        occurrence: 35,
        min: 2,
        max: 5
    },
    Rare: {
        occurrence: 30,
        min: 3,
        max: 7
    },
    Epic: {
        occurrence: 15,
        min: 5,
        max: 10
    },
    Legendary: {
        occurrence: 5,
        min: 8,
        max: 14
    }
}

export interface Smiley {
    icon: IconDefinition
    name: string
    rarity: Rarity
    baseStats: {
        strength: number
        defense: number
        health: number
    }
}

const rarityOrder: { [key in Rarity]: number } = {
    Crap: 1,
    Normal: 2,
    Rare: 3,
    Epic: 4,
    Legendary: 5
}

export function sortByRarity(smileys: Smiley[]): Smiley[] {
    return smileys.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity])
}

