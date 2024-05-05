import { IconDefinition } from '@fortawesome/pro-regular-svg-icons'

export type Rarity = 'Crap' | 'Normal' | 'Rare' | 'Epic' | 'Legendary'

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

export const config: { [key in Rarity]: { min: number, max: number, occurrence: number }} = {
    Crap: {
        occurrence: 5,
        min: 1,
        max: 2
    },
    Normal: {
        occurrence: 35,
        min: 2,
        max: 4
    },
    Rare: {
        occurrence: 30,
        min: 3,
        max: 6
    },
    Epic: {
        occurrence: 15,
        min: 5,
        max: 8
    },
    Legendary: {
        occurrence: 5,
        min: 8,
        max: 10
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

