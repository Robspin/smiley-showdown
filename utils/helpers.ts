import seasonData from '@/utils/smileys/season-data.json'
import { Smiley } from '@/utils/smileys/config'

export function getRandomItem(array: any[]): any {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

export function getRandomSmileyNames(): string[] {
    // @ts-ignore
    const smileys: Smiley[] = seasonData.smileys as Smiley[]

    const getSmileyKey = () => getRandomItem(smileys).icon

    return [getSmileyKey(), getSmileyKey(), getSmileyKey(), getSmileyKey(), getSmileyKey()]
}
