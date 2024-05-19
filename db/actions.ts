"use server"
import db from "@/db/drizzle"
import { decks, users } from '@/db/schema'
import { v4 as uuidv4 } from 'uuid'
import { unstable_noStore as noStore } from 'next/cache'


type CreateUserData = {
    clerkUserId: string
    name: string
    email: string
}

type CreateDeckData = {
    userId: string,
    smileyKeys: string[]
}

export const getDBUser = async (userId: string) => {
    noStore()
    return db.query.users.findFirst({
        where: ((strat, { eq }) => eq(strat.clerkUserId, userId)),
    })
}

export const createDBUser = async (user: CreateUserData) => {
    noStore()
    return db.insert(users).values({
        id: uuidv4(),
        clerkUserId: user.clerkUserId,
        name: user.name,
        email: user.email
    })
}

export const getDBDeck = async (userId: string) => {
    noStore()
    return db.query.decks.findFirst({
        where: ((strat, { eq }) => eq(strat.userId, userId)),
    })
}

export const createOrReplaceDBDeck = async (deck: CreateDeckData) => {
    noStore()
    const existingDeck = await getDBDeck(deck.userId)

    if (!existingDeck) {
        return db.insert(decks).values({
            id: uuidv4(),
            userId: deck.userId,
            smileyKeys: JSON.stringify(deck.smileyKeys)
        })
    } else {
        return db.update(decks).set({
            ...existingDeck,
            smileyKeys: JSON.stringify(deck.smileyKeys)
        })
    }
}