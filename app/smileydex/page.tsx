import { Rarity, Smiley } from '@/utils/smileys/config'
import battleSmileys from '@/utils/smileys/battle-smileys.json'
import SmileyCard from '@/components/smiley-card'
import { TypographyH1, TypographyH2 } from '@/components/typography'
import PageContainer from '@/components/page-container'
import RarityText from '@/components/typography/rarity-text'



export default function Page() {
    // @ts-ignore
    const smileys: Smiley[] = battleSmileys as Smiley[]

    const byRarity: { [key in Rarity]: Smiley[] } = {
        Legendary: [],
        Epic: [],
        Rare: [],
        Normal: [],
        Crap: [],
    }

    smileys.forEach(s => byRarity[s.rarity].push(s))

    return (
        <PageContainer>
            <div>
                <TypographyH1>
                    SmileyDex
                </TypographyH1>
            </div>
            {Object.keys(byRarity).map((r) => (
                <div key={r} className="mb-8">
                    <RarityText rarity={r as Rarity}>
                        <TypographyH2>{r}</TypographyH2>
                    </RarityText>
                    <div className="flex flex-wrap gap-10">
                        {byRarity[r as Rarity].map((s, i) => <SmileyCard smiley={s} key={i} />)}
                    </div>
                </div>
            ))}
        </PageContainer>
    );
}
