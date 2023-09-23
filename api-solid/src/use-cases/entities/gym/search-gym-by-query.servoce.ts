import { GymRepository } from '@/repositories/gym.repository'

export class SearchGymByQueryUseCase {
  constructor(private gymRepository: GymRepository) {}

  async handle(query: string, page: number) {
    const gyms = await this.gymRepository.searchManyByQuery(query, page)

    return {
      gyms,
    }
  }
}
