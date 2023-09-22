import { db } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-in.repository'

export class PrismaCheckInRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await db.checkIn.create({
      data,
    })

    return { checkIn }
  }

  async getById(id: string) {
    const checkIn = await db.checkIn.findUnique({
      where: {
        id,
      },
    })

    if (!checkIn) return null
    return {
      checkIn,
    }
  }
}
