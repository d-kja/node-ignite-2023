import { CreateOrganization, Organization } from '@/@types/repository/entities'

export interface OrganizationRepository {
  create(data: CreateOrganization): Promise<Organization>
  update(data: Partial<Organization>): Promise<Organization>
  findById(data: string): Promise<Organization | null>
  findByEmail(data: string): Promise<Organization | null>
}
