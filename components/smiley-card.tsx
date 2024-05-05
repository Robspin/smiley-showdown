import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSquareFull } from '@fortawesome/pro-solid-svg-icons/faSquareFull'
import { config, Rarity, Smiley } from '@/utils/smileys/config'
import { TypographyH4 } from '@/components/typography'


const rarityColor: any = {
    Crap: "bg-gradient-to-r from-slate-500 to-slate-800",
    Normal: "bg-gradient-to-r from-emerald-500 to-emerald-900",
    Rare: "bg-gradient-to-r from-violet-600 to-indigo-600",
    Epic: "bg-gradient-to-r from-fuchsia-600 to-pink-600",
    Legendary: "bg-gradient-to-r from-amber-200 to-yellow-500",
}

export function ColoredStat({ rarity, value, title }: { rarity: Rarity, value: number, title: string }) {
    const maxStat = config[rarity].max === value
    const highStat = config[rarity].min < value

    return (
        <li>{title}: <span className={`${maxStat ? 'text-yellow-500' : highStat && 'text-green-600'}`}>{value}</span></li>
    )
}

type Props = {
    smiley: Smiley
}

export function SmileyFace({ smiley, className }: { smiley: Smiley, className?: string }) {
    return (
        <FontAwesomeIcon icon={['far', smiley.icon as unknown as IconName]} inverse transform="shrink-4"
                         mask={faSquareFull as IconProp} color="white"
                         className={`${rarityColor[smiley.rarity]} ${className}`}/>
    )
}

export default function SmileyCard({ smiley }: Props) {
    return (
        <div className="border border-gray-400 p-3 rounded flex flex-wrap">
            <div className="flex flex-col justify-center items-center gap-4 min-w-52">
                <SmileyFace className="h-20 w-20" smiley={smiley} />
                <TypographyH4>{smiley.name}</TypographyH4>

                <div>
                    <ul className="text-sm list-disc">
                        <ColoredStat title="Health" value={smiley.baseStats.health} rarity={smiley.rarity} />
                        <ColoredStat title="Strength" value={smiley.baseStats.strength} rarity={smiley.rarity} />
                        <ColoredStat title="Defense" value={smiley.baseStats.defense} rarity={smiley.rarity} />
                    </ul>
                </div>
            </div>
        </div>
    )
}
