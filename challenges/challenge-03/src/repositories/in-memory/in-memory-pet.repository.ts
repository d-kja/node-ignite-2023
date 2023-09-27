import { CreatePet, Pet } from '@/@types/repository/entities'
import { FilterByCharacteristicsParams, PetRepository } from '../pet.repository'

import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetRepository {
  private repository: Pet[] = []

  async create(data: CreatePet): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      images: data.images ?? [],
      size: data.size ?? 'NORMAL',
      city: data.city,
      age: data.age ?? 'NEUTRAL',
      energy: data.energy,
      independence: data.independence,
      isClaustrophobic: data.isClaustrophobic,
      isAdopted: data.isAdopted ?? false,
      otherRequirements: data.otherRequirements ?? [],
      state: data.state,
      org_id: data.org_id,
      created_at: new Date(),
    } satisfies Pet

    this.repository.push(pet)

    return pet
  }
  async update(data: Partial<Pet>): Promise<Pet> {
    const petIndex = this.repository.findIndex((item) => item.id === data.id)

    if (petIndex < 0) {
      throw new Error('pet not found')
    }

    const pet = this.repository[petIndex]

    this.repository[petIndex] = {
      ...pet,
      ...data,
    }

    return this.repository[petIndex]
  }
  async findById(data: string): Promise<Pet | null> {
    const pet = this.repository.find((item) => item.id === data)

    if (!pet) return null
    return pet
  }
  async findByCity(city: string): Promise<Pet[]> {
    const pets = this.repository.filter(
      (item) => item.city === city && !item.isAdopted,
    )

    return pets
  }
  async filterByCharacteristics(
    data: FilterByCharacteristicsParams,
  ): Promise<Pet[]> {
    const characteristicKeys = Object.keys(data)

    const characteristic = this.repository.filter((item) => {
      const hasEveryCharacteristic = characteristicKeys.every(
        (unknownKey: string) => {
          type keysType = keyof typeof data
          const key = unknownKey as any as keysType

          return item[key] === data[key]
        },
      )

      return hasEveryCharacteristic
    })

    if (characteristic.length) {
      return characteristic
    }

    return this.repository
  }
}
