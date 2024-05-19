import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/pro-regular-svg-icons'
import "./globals.css";
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceAwesome, fas } from '@fortawesome/pro-solid-svg-icons'
import NavbarLinks from '@/components/navbar-links'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { createDBUser, createOrReplaceDBDeck, getDBUser } from '@/db/actions'
import { getRandomSmileyNames } from '@/utils/helpers'
import { DatabaseDataProvider } from '@/components/database-data-provider'


library.add(far)
// @ts-ignore
library.add(fas)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smiley Showdown",
  description: "They can't all keep smiling forever!",
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const user = await currentUser()
    const databaseUser = await getDBUser(user?.id ?? '')

    if (!databaseUser && user) {
        const createUserData = {
            clerkUserId: user.id,
            name: user.username ?? 'defaultUserName',
            email: user.emailAddresses[0]?.emailAddress ?? 'defaultEmail'
        }
        await createDBUser(createUserData)
    }

    return (
      <ClerkProvider>
          <html lang="en">
          <link rel="icon" href="/favicon.png" sizes="any"/>
              <body className={`${inter.className} w-full flex flex-col items-center overflow-y-scroll bg-slate-800 text-slate-50`}>
                <div className="w-full border-b border-slate-600 flex justify-center">
                  <nav className="px-8 md:px-16 py-3 max-lg:min-w-full lg:min-w-[1024px] max-w-[1024px] flex justify-between">
                    <Link href="/" className="inline-block">
                        <FontAwesomeIcon icon={faFaceAwesome as IconProp} size="2xl" className="h-10 w-10 text-orange-300" />
                    </Link>
                      <NavbarLinks />
                  </nav>
                </div>
                  <div className="max-lg:min-w-full lg:min-w-[1024px] max-w-[1024px] md:p-8">
                      {children}
                  </div>
              </body>
          </html>
      </ClerkProvider>
    )
}
