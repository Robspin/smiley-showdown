"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createOrReplaceDBDeck } from '@/db/actions'
import { getRandomSmileyNames } from '@/utils/helpers'
import { faArrowsRotate } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    userId: string
    update?: boolean
}

export default function GenerateDeck({ userId, update = false }: Props) {
    const router = useRouter()

    const generateNewDeck = async () => {
        await createOrReplaceDBDeck({ userId, smileyKeys: getRandomSmileyNames() })
        router.refresh()
    }

    return <Button onClick={generateNewDeck} className="hover:opacity-90 uppercase font-semibold" size={update ? "sm" : "lg"}><FontAwesomeIcon icon={faArrowsRotate} className="mr-3" /> {update ? 'Reroll deck' : 'Generate your deck!' }</Button>
}