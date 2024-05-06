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
    const highStat = config[rarity].min + 1 < value

    return (
        <li>{title}: <span className={`${maxStat ? 'text-yellow-500' : highStat && 'text-green-600'}`}>{value}</span></li>
    )
}

type Props = {
    smiley: Smiley
}

export function SmileyFace({ smiley, className }: { smiley: Smiley, className?: string }) {
    return (
        <FontAwesomeIcon icon={['fas', smiley.icon as unknown as IconName]} inverse transform="shrink-4"
                         mask={faSquareFull as IconProp}
                         className={`${rarityColor[smiley.rarity]} text-slate-800 ${className}`}/>
    )
}

export default function SmileyCard({ smiley }: Props) {
    return (
        <div className="border border-gray-400 rounded flex flex-wrap bg-slate-600 hover:-translate-y-2 transition">
            <div className="flex flex-col justify-center items-center w-52">
                <div className="p-3">
                    <div className="border border-slate-500 h-20 w-20 rounded overflow-hidden flex items-center justify-center">
                        <SmileyFace className="h-20 w-20" smiley={smiley} />
                    </div>
                </div>
                <div className="w-full text-center overflow-hidden border-t border-slate-500 p-3">
                    <TypographyH4>{smiley.name}</TypographyH4>
                    <ul className="text-sm">
                        <ColoredStat title="Health" value={smiley.baseStats.health} rarity={smiley.rarity} />
                        <ColoredStat title="Strength" value={smiley.baseStats.strength} rarity={smiley.rarity} />
                        <ColoredStat title="Defense" value={smiley.baseStats.defense} rarity={smiley.rarity} />
                    </ul>
                </div>
            </div>
        </div>
    )
}
