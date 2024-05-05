type Rarity = 'Crap' | 'Normal' | 'Rare' | 'Epic' | 'Legendary'

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

export const names: string[] = [
    "face-hand-yawn",
    "face-hand-peeking",
    "face-icicles",
    "face-glasses",
    "face-smile-beam",
    "face-grin-stars",
    "face-unamused",
    "face-awesome",
    "face-smile-horns",
    "face-grin-tongue-squint",
    "face-flushed",
    "face-angry-horns",
    "face-mask",
    "face-beam-hand-over-mouth",
    "face-kiss-beam",
    "face-frown-slight",
    "face-sleeping",
    "face-cowboy-hat",
    "face-anguished",
    "face-dizzy",
    "face-pleading",
    "face-shush",
    "face-saluting",
    "face-persevering",
    "face-scream",
    "face-kiss",
    "face-grin-tongue",
    "face-grin-wink",
    "face-relieved",
    "face-zany",
    "face-grin-wide",
    "face-frown-open",
    "face-holding-back-tears",
    "face-anxious-sweat",
    "face-smile-tear",
    "face-weary",
    "face-astonished",
    "face-laugh-squint",
    "face-laugh",
    "face-downcast-sweat",
    "face-exhaling",
    "face-laugh-beam",
    "face-tired",
    "face-smile-wink",
    "face-confounded",
    "face-hushed",
    "face-confused",
    "face-party",
    "face-kiss-wink-heart",
    "face-grin-beam",
    "face-disguise",
    "face-rolling-eyes",
    "face-sleepy",
    "face-thermometer",
    "face-nauseated",
    "face-surprise",
    "face-hand-over-mouth",
    "face-clouds",
    "face-meh-blank",
    "face-zipper",
    "face-raised-eyebrow",
    "face-sad-cry",
    "face-frown",
    "face-kiss-closed-eyes",
    "face-tongue-money",
    "face-grin-squint",
    "face-pensive",
    "face-grin-tears",
    "face-melting",
    "face-fearful",
    "face-tissue",
    "face-grin-squint-tears",
    "face-smile-upside-down",
    "face-smile-halo",
    "face-smile-plus",
    "face-swear",
    "face-head-bandage",
    "face-spiral-eyes",
    "face-lying",
    "face-grin",
    "face-meh",
    "face-dotted",
    "face-worried",
    "face-smile-hearts",
    "face-laugh-wink",
    "face-drooling",
    "face-sunglasses",
    "face-smiling-hands",
    "face-tongue-sweat",
    "face-smirking",
    "face-smile-tongue",
    "face-disappointed",
    "face-eyes-xmarks",
    "face-expressionless",
    "face-smile",
    "face-vomit",
    "face-grin-hearts",
    "face-grin-beam-sweat",
    "face-diagonal-mouth",
    "face-pouting",
    "face-explode",
    "face-grin-tongue-wink",
    "face-angry",
    "face-monocle",
    "face-viewfinder",
    "face-thinking",
    "mask-face",
    "face-grimace",
    "face-sad-sweat",
    "face-sad-tear",
    "face-smile-relaxed",
    "face-nose-steam",
    "face-woozy"
]

interface Smiley {
    icon: string
    name: string
    rarity: Rarity
    baseStats: {
        strength: number
        defense: number
        health: number
    }
}

function pickRarity(): Rarity {
    const total = Object.values(config).reduce((sum, { occurrence }) => sum + occurrence, 0)
    let random = Math.floor(Math.random() * total)
    for (const rarity of Object.keys(config) as Rarity[]) {
        random -= config[rarity].occurrence
        if (random < 0) {
            return rarity
        }
    }
    return 'Normal'
}

function randomStat(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const smileys: Smiley[] = names.map(icon => {
    const rarity = pickRarity();
    const { min, max } = config[rarity];
    const cleanedName = icon.replace('face-', '').replaceAll('-', ' ')
    return {
        icon,
        name: cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1),
        rarity,
        baseStats: {
            strength: randomStat(min, max),
            defense: randomStat(min, max),
            health: randomStat(min, max)
        }
    }
})

async function writeJsonFile(filePath: string, data: object) {
    try {
        const jsonData = JSON.stringify(data, null, 2)
        // @ts-ignore
        await Deno.writeTextFile(filePath, jsonData)
        console.log('JSON file has been written successfully.')
    } catch (error) {
        console.error('Error writing JSON to file:', error)
    }
}

const filePath = "./utils/smileys/battle-smileys.json"
// @ts-ignore
await writeJsonFile(filePath, smileys)

console.log(`Smileys data written to ${filePath}`)