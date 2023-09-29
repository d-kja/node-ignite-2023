import { CreatePet, Pet } from '@/@types/repository/entities'
import { z } from 'zod'

export const FilterByCharacteristicsSchema = z.object({
  city: z.string(),
  age: z.enum(['NEW', 'NEUTRAL', 'OLD']).optional(),
  size: z.enum(['SMOL', 'NORMAL', 'LARGE']).optional(),
  energy: z.number().min(1).max(5).optional(),
  independence: z.number().min(1).max(3).optional(),
  isClaustrophobic: z.boolean().optional(),
})

export type FilterByCharacteristicsParams = {
  city: string
  age?: 'NEW' | 'NEUTRAL' | 'OLD'
  size?: 'SMOL' | 'NORMAL' | 'LARGE'
  energy?: number
  independence?: number
  isClaustrophobic?: boolean
}

export interface PetRepository {
  create(data: CreatePet): Promise<Pet>
  update(data: Partial<Pet>): Promise<Pet>
  findById(data: string): Promise<Pet | null>
  findByCity(data: string, page: number): Promise<Pet[]>
  filterByCharacteristics(
    data: FilterByCharacteristicsParams,
    page: number,
  ): Promise<Pet[]>
}
