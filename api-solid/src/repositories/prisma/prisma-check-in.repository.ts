import { db } from '@/lib/prisma'
import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { CheckInRepository } from '../check-in.repository'

export class PrismaCheckInRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await db.checkIn.create({
      data,
    })

    return { checkIn }
  }

  async update(data: CheckIn) {
    const checkIn = await db.checkIn.update({
      where: { id: data.id },
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

  async getCountByUserId(userId: string) {
    const totalCheckIns = await db.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return { totalCheckIns }
  }

  async getManyByUserId(userId: string, page: number | undefined = 1) {
    const checkIns = await db.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return { checkIns }
  }

  async getByUserIdOnDate(userId: string, date: Date) {
    const startOfDate = dayjs(date).startOf('date')
    const endOfDate = dayjs(date).endOf('date')

    const checkIn = await db.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDate.toDate(),
          lte: endOfDate.toDate(),
        },
      },
    })

    if (!checkIn) return null

    return {
      checkIn,
    }
  }
}
