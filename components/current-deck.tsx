import { currentUser } from '@clerk/nextjs/server'
import seasonData from '@/utils/smileys/season-data.json'
import { getDBDeck, getDBUser } from '@/db/actions'
import SmileyCard from '@/components/smiley-card'
import GenerateDeck from '@/components/generate-deck'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'


function Deck({ smileyKeys }: { smileyKeys: string[] }) {
    // @ts-ignore
    const seasonSmileys: Smiley[] = seasonData.smileys as Smiley[]
    const smileys = smileyKeys.map(iconKey => seasonSmileys.find(s => s.icon === iconKey))

    return (
        <div className="flex flex-wrap gap-10 justify-center items-center">
            {smileys.map((s, i) => <SmileyCard smiley={s} key={i}/>)}
        </div>
    )
}

export default async function CurrentDeck() {
    const user = await currentUser()

    const databaseUser = user ? await getDBUser(user?.id ?? '') : null
    const deck =  user ? await getDBDeck(databaseUser?.id ?? ''): []

    if (!deck && databaseUser) return <div className="mt-32"><GenerateDeck userId={databaseUser.id} /></div>

    // @ts-ignore
    const smileyKeys = deck ? JSON.parse(deck?.smileyKeys ?? '') : []

    if (databaseUser) return (
        <div>
            <Link href="/battle" className="group">
                <Button size="lg" className="uppercase font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition">
                    <div className="flex items-center">
                        Battle Now
                        <FontAwesomeIcon icon={faArrowRight as IconProp} className="ml-3 h-4 w-4 text-lg group-hover:translate-x-1 transition" />
                    </div>
                </Button>
            </Link>
            <div className="mt-32">
                <div className="relative">
                    <h3 className="pb-2 text-2xl text-medium border-b border-b-stone-700 mb-8">Your current Deck</h3>
                    <div className="right-0 top-0 absolute">
                        <GenerateDeck userId={databaseUser.id} update={true} />
                    </div>
                </div>
                <Deck smileyKeys={smileyKeys} />
            </div>
        </div>
    )

    return null
}