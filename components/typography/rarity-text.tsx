import { ReactNode } from 'react'
import { Rarity } from '@/utils/smileys/config'


export const rarityColor: any = {
    Crap: "bg-gradient-to-r from-slate-500 to-slate-800",
    Normal: "bg-gradient-to-r from-emerald-500 to-emerald-900",
    Rare: "bg-gradient-to-r from-violet-600 to-indigo-600",
    Epic: "bg-gradient-to-r from-fuchsia-600 to-pink-600",
    Legendary: "bg-gradient-to-r from-amber-200 to-yellow-500",
}

type Props = {
    children: ReactNode
    rarity: Rarity
    className?: string
}

export default function RarityText({ children, rarity, className }: Props) {
    return (
        <div className={`bg-clip-text text-transparent ${rarityColor[rarity]} ${className}`}>{children}</div>
    )
}
