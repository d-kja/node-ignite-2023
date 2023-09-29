import { CreatePet, Pet } from '@/@types/repository/entities'
import { prisma } from '@/libs/prisma'
import { FilterByCharacteristicsParams, PetRepository } from '../pet.repository'

export class PrismaPetRepository implements PetRepository {
  async create(data: CreatePet): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet as Pet
  }
  async update(data: Partial<Pet>): Promise<Pet> {
    const pet = await prisma.pet.update({
      where: {
        id: data.id,
      },
      data,
    })

    return pet as Pet
  }
  async findById(data: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id: data,
      },
    })

    return pet as Pet
  }
  async findByCity(data: string, page: number): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        city: data,
      },
    })

    return pets as Pet[]
  }
  async filterByCharacteristics(
    data: FilterByCharacteristicsParams,
    page: number,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        ...data,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return pets as Pet[]
  }
}
