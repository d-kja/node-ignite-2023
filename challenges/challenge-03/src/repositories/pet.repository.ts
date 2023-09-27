import { CreatePet, Pet } from '@/@types/repository/entities'

export type FilterByCharacteristicsParams = {
  age?: Pet['age']
  size?: Pet['size']
  energy?: Pet['energy']
  independence?: Pet['independence']
  isClaustrophobic?: boolean
}

export interface PetRepository {
  create(data: CreatePet): Promise<Pet>
  update(data: Partial<Pet>): Promise<Pet>
  findById(data: string): Promise<Pet | null>
  findByCity(data: string): Promise<Pet[]>
  filterByCharacteristics(data: FilterByCharacteristicsParams): Promise<Pet[]>
}
