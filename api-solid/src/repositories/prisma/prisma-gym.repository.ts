import { db } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import {
  FindManyByDistanceRequestParams,
  GymRepository,
} from '../gym.repository'

export class PrismaGymRepository implements GymRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await db.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string) {
    const gym = await db.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async searchManyByQuery(query: string, page = 1) {
    const gyms = await db.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return gyms
  }

  async findManyByDistance({
    latitude,
    longitude,
  }: FindManyByDistanceRequestParams) {
    const gyms = await db.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
