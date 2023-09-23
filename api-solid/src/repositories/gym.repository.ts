import { Gym, Prisma } from '@prisma/client'

export interface FindManyByDistanceRequestParams {
  latitude: number
  longitude: number
}

export interface GymRepository {
  create: (data: Prisma.GymCreateInput) => Promise<Gym>
  findById: (id: string) => Promise<Gym | null>
  searchManyByQuery: (query: string, page: number) => Promise<Gym[] | null>
  findManyByDistance: (
    params: FindManyByDistanceRequestParams,
  ) => Promise<Gym[] | null>
}
