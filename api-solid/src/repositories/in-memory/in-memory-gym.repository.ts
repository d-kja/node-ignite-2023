import type { Gym, Prisma } from '@prisma/client'
import {
  FindManyByDistanceRequestParams,
  GymRepository,
} from '../gym.repository'

import { getDistanceBetweenCoordinates } from '@/lib/utils/get-distance-between-coordinates'
import { randomUUID } from 'node:crypto'

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
    } as Gym

    this.gyms.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) return null
    return gym
  }

  async searchManyByQuery(query: string, page: number) {
    const gyms = this.gyms
      .filter((gym) => gym.title.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyByDistance({
    latitude,
    longitude,
  }: FindManyByDistanceRequestParams) {
    const gyms = this.gyms.filter((gym) => {
      const gymLat = gym.latitude.toNumber()
      const gymLong = gym.longitude.toNumber()

      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gymLat,
          longitude: gymLong,
        },
      )

      return distance <= 10
    })

    return gyms
  }
}
