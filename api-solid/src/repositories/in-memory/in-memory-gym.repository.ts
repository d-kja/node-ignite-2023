import type { Gym, Prisma } from '@prisma/client'
import { GymRepository } from '../gym.repository'

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
}
