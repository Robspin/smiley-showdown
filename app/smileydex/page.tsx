import { Rarity, Smiley } from '@/utils/smileys/config'
import seasonData from '@/utils/smileys/season-data.json'
import SmileyCard from '@/components/smiley-card'
import { TypographyH1, TypographyH2 } from '@/components/typography'
import PageContainer from '@/components/page-container'
import RarityText from '@/components/typography/rarity-text'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/pro-solid-svg-icons'

// @ts-ignore
library.add(fas)

export default function Page() {
    // @ts-ignore
    const smileys: Smiley[] = seasonData.smileys as Smiley[]

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
            <div className="flex justify-between mb-12">
                <TypographyH1>
                    SmileyDex
                </TypographyH1>
                <p className="text-slate-400 mt-6 text-sm">Season started at {new Date(seasonData?.createdAt ?? '').toLocaleDateString()}</p>
            </div>
            {Object.keys(byRarity).map((r) => (
                <div key={r} className="mb-16">
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
