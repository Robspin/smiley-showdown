
export function getRandomItem(array: any[]): any {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}