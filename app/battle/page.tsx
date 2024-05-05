import PageContainer from '@/components/page-container'
import { TypographyH1 } from '@/components/typography'
import { Smiley } from '@/utils/smileys/config'
import battleSmileys from '@/utils/smileys/battle-smileys.json'
import { getRandomItem } from '@/utils/helpers'
import { SmileyFace } from '@/components/smiley-card'
import BattleScene from '@/components/battle/battle-scene'

function PlayerSmiley({ smiley }: { smiley: Smiley }) {
    return (
            <div className="w-full flex justify-center pt-16 pb-32">
                <SmileyFace smiley={smiley} className="h-40 w-40" />
            </div>
    )
}

export default function Page() {
    // @ts-ignore
    const smileys: Smiley[] = battleSmileys as Smiley[]

    const sceneData = {
        playerSmileys: [getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys)],
        enemySmileys: [getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys), getRandomItem(smileys)]
    }


    return (
        <PageContainer>
            <TypographyH1>
                Showdown
            </TypographyH1>
            <BattleScene sceneData={sceneData} />
        </PageContainer>
    )
}