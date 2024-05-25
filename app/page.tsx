import { TypographyP } from '@/components/typography'
import PageContainer from '@/components/page-container'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import RarityText from '@/components/typography/rarity-text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import CurrentDeck from '@/components/current-deck'

export default function Page() {

    return (
      <PageContainer>
          <div className="text-center">
              <RarityText rarity="Epic">
                  <h1 className="text-7xl font-bold tracking-tighter p-2">
                      Smiley Showdown
                  </h1>
              </RarityText>
              <div className="mt-12 mb-24">
                  <TypographyP>
                      The time of peace within the FontAwesome Smiley community is over!
                  </TypographyP>
                  <TypographyP>
                      Groups of smileys have banded together to fight for wealth, glory and to prove their worth!!
                  </TypographyP>
              </div>
              <div className="flex flex-col gap-16">
                  <SignedOut>
                      <SignInButton>
                          <div className="group block">
                              <Button size="lg" className="uppercase font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition">
                                  <div className="flex items-center">
                                      Battle Now
                                      <FontAwesomeIcon icon={faArrowRight as IconProp} className="ml-3 h-4 w-4 text-lg group-hover:translate-x-1 transition" />
                                  </div>
                              </Button>
                          </div>
                      </SignInButton>
                  </SignedOut>
                  <SignedIn>
                      <CurrentDeck />
                  </SignedIn>
              </div>
          </div>
      </PageContainer>
    )
}
