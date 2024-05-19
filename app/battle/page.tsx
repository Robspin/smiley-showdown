import PageContainer from '@/components/page-container'
import { TypographyH1 } from '@/components/typography'
import { Smiley } from '@/utils/smileys/config'
import seasonData from '@/utils/smileys/season-data.json'
import { getRandomItem } from '@/utils/helpers'

import BattleScene from '@/components/battle/battle-scene'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'

export default async function Page() {

    // @ts-ignore
    const smileys: Smiley[] = seasonData.smileys as Smiley[]

    const sceneData = {
        playerSmileys: [getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys)],
        enemySmileys: [getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys)]
    }

    // if (user) {
    //     console.log(user?.id, user.username)
    // }


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