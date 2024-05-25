"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const routes = [
    // {
    //     name: 'Battle',
    //     href: '/battle'
    // },
    {
        name: 'SmileyDex',
        href: '/smileydex'
    },
    // {
    //     name: 'About',
    //     href: '/about'
    // }
]

export default function NavbarLinks() {
    const pathname = usePathname()

    return (
        <div className="flex justify-center items-center gap-4 text-slate-400">
            {routes.map(r => <Link key={r.name} href={r.href} className={`${pathname.toLowerCase() === r.href.toLowerCase() && 'text-slate-50'}`}>{r.name}</Link>)}
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}