import { currentUser } from '@clerk/nextjs/server'
import seasonData from '@/utils/smileys/season-data.json'
import { getDBDeck, getDBUser } from '@/db/actions'
import { Button } from '@/components/ui/button'
import SmileyCard from '@/components/smiley-card'
import GenerateDeck from '@/components/generate-deck'


function Deck({ smileyKeys }: { smileyKeys: string[] }) {
    // @ts-ignore
    const seasonSmileys: Smiley[] = seasonData.smileys as Smiley[]

    const smileys = smileyKeys.map(iconKey => seasonSmileys.find(s => s.icon === iconKey))

    console.log('smileys: ', smileys)

    return (
        <div className="flex flex-wrap gap-10">
            {smileys.map((s, i) => <SmileyCard smiley={s} key={i}/>)}
        </div>
    )
}

export default async function CurrentDeck() {
    const user = await currentUser()
    const databaseUser = await getDBUser(user?.id ?? '')

    const deck = await getDBDeck(databaseUser?.id ?? '')

    if (!deck && databaseUser) return <GenerateDeck userId={databaseUser.id} />

    const smileyKeys = JSON.parse(deck?.smileyKeys ?? '')

    if (databaseUser) return (
        <>
            <Deck smileyKeys={smileyKeys} />
            <GenerateDeck userId={databaseUser.id} update={true} />
        </>
    )

    return null

    // if (!databaseUser && user) {
    //     const createUserData = {
    //         clerkUserId: user.id,
    //         name: user.username ?? 'defaultUserName',
    //         email: user.emailAddresses[0]?.emailAddress ?? 'defaultEmail'
    //     }
    //     await createDBUser(createUserData)
    // } else if (databaseUser) {
    //     console.log('databaseUser :', databaseUser)
    //     console.log(await createOrReplaceDBDeck({ userId: databaseUser.id, smileyKeys: getRandomSmileyNames() }))
    // }
}