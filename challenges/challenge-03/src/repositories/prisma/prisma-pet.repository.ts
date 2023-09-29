import { CreatePet, Pet } from '@/@types/repository/entities'
import { FilterByCharacteristicsParams, PetRepository } from '../pet.repository'

export class PrismaPetRepository implements PetRepository {
  create(data: CreatePet): Promise<Pet> {
    throw new Error('Method not implemented.')
  }
  update(data: Partial<Pet>): Promise<Pet> {
    throw new Error('Method not implemented.')
  }
  findById(data: string): Promise<Pet | null> {
    throw new Error('Method not implemented.')
  }
  findByCity(data: string, page: number): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }
  filterByCharacteristics(
    data: FilterByCharacteristicsParams,
    page: number,
  ): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }
}
