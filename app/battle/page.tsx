import PageContainer from '@/components/page-container'
import { TypographyH1, TypographyH4 } from '@/components/typography'
import { Smiley } from '@/utils/smileys/config'
import battleSmileys from '@/utils/smileys/battle-smileys.json'
import { getRandomItem } from '@/utils/helpers'
import { ColoredStat, SmileyFace } from '@/components/smiley-card'
import RarityText from '@/components/typography/rarity-text'

const bgStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
}

function PlayerSmiley({ smiley }: { smiley: Smiley }) {
    return (
            <div className="w-full flex justify-center pt-16 pb-32">
                <SmileyFace smiley={smiley} className="h-40 w-40" />
            </div>
    )
}

function EnemySmiley({ smiley }: { smiley: Smiley }) {
    return (
            <div className="w-full flex justify-center pt-16 pb-32">
                <SmileyFace smiley={smiley} className="h-40 w-40"/>
            </div>
    )
}

type Props = {
    type: 'Player' | 'Enemy'
    smiley: Smiley
    health: number
}

function Hud({ type, smiley, health }: Props) {

    return (
        <>
            <div className="relative mx-2">
                <div style={{ width: `${String(health)}%` }} className={`rounded h-2 bg-green-400 mb-2 absolute transition`}/>
                <div className="w-full rounded h-2 bg-red-400 mb-2 "/>
            </div>
                <div className="w-full border-slate-500 border rounded-xl h-full p-4" style={bgStyle}>
                    <div className="flex justify-between">
                        <TypographyH4>
                            {type} smiley:
                        </TypographyH4>
                        <RarityText rarity={smiley.rarity}>
                            <TypographyH4>
                                {smiley.name}
                            </TypographyH4>
                        </RarityText>
                    </div>
                    <div>
                        <ul className="text-sm mt-4">
                            <ColoredStat title="Health" value={smiley.baseStats.health} rarity={smiley.rarity}/>
                            <ColoredStat title="Strength" value={smiley.baseStats.strength} rarity={smiley.rarity}/>
                            <ColoredStat title="Defense" value={smiley.baseStats.defense} rarity={smiley.rarity}/>
                        </ul>
                    </div>
            </div>
        </>
    )
}

export default function Page() {
    // @ts-ignore
    const smileys: Smiley[] = battleSmileys as Smiley[]

    const playerSmiley: Smiley = getRandomItem(smileys)
    const enemySmiley: Smiley = getRandomItem(smileys)


    return (
        <PageContainer>
            <TypographyH1>
                Showdown
            </TypographyH1>
            <div className="grid grid-cols-9 rounded-xl overflow-hidden">
                <div className="w-full flex flex-col col-span-4">
                    <div className="w-full flex justify-center pt-16 pb-32">
                        <SmileyFace smiley={playerSmiley} className="h-40 w-40"/>
                    </div>
                    <Hud type="Player" smiley={playerSmiley} health={88} />
                </div>
                <div/>
                <div className="w-full flex flex-col col-span-4">
                    <div className="w-full flex justify-center pt-16 pb-32">
                        <SmileyFace smiley={enemySmiley} className="h-40 w-40"/>
                    </div>
                    <Hud type="Enemy" smiley={enemySmiley} health={100} />
                </div>
            </div>
        </PageContainer>
    )
}