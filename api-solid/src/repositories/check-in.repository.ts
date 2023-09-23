import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create: (
    data: Prisma.CheckInUncheckedCreateInput,
  ) => Promise<{ checkIn: CheckIn }>

  update: (data: CheckIn) => Promise<{ checkIn: CheckIn }>

  getById: (id: string) => Promise<{ checkIn: CheckIn } | null>

  getManyByUserId: (
    userId: string,
    page?: number,
  ) => Promise<{ checkIns: CheckIn[] }>

  getByUserIdOnDate: (
    userId: string,
    date: Date,
  ) => Promise<{ checkIn: CheckIn } | null>

  getCountByUserId: (
    userId: string,
  ) => Promise<{ totalCheckIns: number } | null>
}
