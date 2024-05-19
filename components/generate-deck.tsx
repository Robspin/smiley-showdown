"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createOrReplaceDBDeck } from '@/db/actions'
import { getRandomSmileyNames } from '@/utils/helpers'

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

    return <Button onClick={generateNewDeck}>{update ? 'Reroll deck' : 'Generate deck' }</Button>
}