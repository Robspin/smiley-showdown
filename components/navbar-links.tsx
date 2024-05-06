"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const routes = [
    {
        name: 'Battle',
        href: '/battle'
    },
    {
        name: 'SmileyDex',
        href: '/smileydex'
    },
    // {
    //     name: 'About',
    //     href: '/about'
    // },
]

export default function NavbarLinks() {
    const pathname = usePathname()

    console.log(pathname)

    return (
        <div className="flex justify-center items-center gap-4 text-slate-400">
            {routes.map(r => <Link href={r.href} className={`${pathname.toLowerCase() === r.href.toLowerCase() && 'text-slate-50'}`}>{r.name}</Link>)}
        </div>
    )
}