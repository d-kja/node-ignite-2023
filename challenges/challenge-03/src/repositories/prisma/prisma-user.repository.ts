import { CreateOrganization, Organization } from '@/@types/repository/entities'
import { OrganizationRepository } from '../user.repository'

export class PrismaOrganizationRepository implements OrganizationRepository {
  create(data: CreateOrganization): Promise<Organization> {
    throw new Error('Method not implemented.')
  }
  update(data: Partial<Organization>): Promise<Organization> {
    throw new Error('Method not implemented.')
  }
  findById(data: string): Promise<Organization | null> {
    throw new Error('Method not implemented.')
  }
  findByEmail(data: string): Promise<Organization | null> {
    throw new Error('Method not implemented.')
  }
}
