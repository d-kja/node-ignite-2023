import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-in.repository'

import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.checkIns.push(checkIn)

    return {
      checkIn,
    }
  }

  async getByUserIdOnDate(userId: string, date: Date) {
    const startOfDate = dayjs(date).startOf('date')
    const endOfDate = dayjs(date).endOf('date')

    const checkIn = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isDateOnTheSameDay =
        checkInDate.isAfter(startOfDate) && checkInDate.isBefore(endOfDate)

      return checkIn.user_id === userId && isDateOnTheSameDay
    })

    if (!checkIn) return null
    return { checkIn }
  }

  async getById(id: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === id)

    if (!checkIn) return null
    return { checkIn }
  }

  async getManyByUserId(userId: string, page = 1) {
    const checkIns = this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return { checkIns }
  }
}
