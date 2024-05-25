import PageContainer from '@/components/page-container'
import { TypographyH1 } from '@/components/typography'
import { Smiley } from '@/utils/smileys/config'
import seasonData from '@/utils/smileys/season-data.json'
import { getRandomItem } from '@/utils/helpers'

import BattleScene from '@/components/battle/battle-scene'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { getDBDeck, getDBUser } from '@/db/actions'
import { IconDefinition } from '@fortawesome/pro-regular-svg-icons'

export default async function Page() {
    const user = await currentUser()

    const databaseUser = user ? await getDBUser(user?.id ?? '') : null
    const deck = user ? await getDBDeck(databaseUser?.id ?? '') : []
    // @ts-ignore
    const smileyKeys = user ? JSON.parse(deck?.smileyKeys ?? '') as IconDefinition[] : []

    // @ts-ignore
    const seasonSmileys: Smiley[] = seasonData.smileys as Smiley[]
    const playerSmileys = smileyKeys.map(iconKey => seasonSmileys.find(s => s.icon === iconKey)) as Smiley[]


    const sceneData = {
        playerSmileys,
        enemySmileys: [getRandomItem(seasonSmileys), getRandomItem(seasonSmileys), getRandomItem(seasonSmileys), getRandomItem(seasonSmileys), getRandomItem(seasonSmileys)]
    }


    return (
        <PageContainer>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
                <TypographyH1>
                    Showdown
                </TypographyH1>
                <BattleScene sceneData={sceneData} />
            </SignedIn>
        </PageContainer>
    )
}