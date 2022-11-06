import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
    log: ['query'], // cria um log de leves
})