"use server"
import db from "@/db/drizzle"
import { users } from '@/db/schema'
import { v4 as uuidv4 } from 'uuid'


type CreateUserData = {
    userId: string
    name: string
    email: string
}

export const getDBUser = async (userId: string) => {
    return db.query.users.findFirst({
        where: ((strat, { eq }) => eq(strat.userId, userId)),
    })
}

export const createDBUser = async (user: CreateUserData) => {
    return db.insert(users).values({
        id: uuidv4(),
        userId: user.userId,
        name: user.name,
        email: user.email
    })
}
