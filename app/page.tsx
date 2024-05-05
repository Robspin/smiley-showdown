import { Rarity, Smiley } from '@/utils/smileys/config'
import battleSmileys from '@/utils/smileys/battle-smileys.json'
import { TypographyH1, TypographyH2, TypographyP } from '@/components/typography'
import PageContainer from '@/components/page-container'
import Link from 'next/link'
import { Button } from '@/components/ui/button'



export default function Page() {

    return (
      <PageContainer>
              <TypographyH1>
                  Smiley Showdown
              </TypographyH1>
          <TypographyP>
              The time of peace within the FontAwesome smiley community is over!
          </TypographyP>
          <TypographyP>
              Groups of smileys have banded together to fight for wealth, glory and to prove their worth!!
          </TypographyP>
          <div className="flex flex-col gap-16 mt-16">
          <Link href="/battle">
              <Button>Battle Now</Button>
          </Link>
          <Link href="/smileydex">
              <Button>View current SmileyDex</Button>
          </Link>
          </div>
      </PageContainer>
    );
}
