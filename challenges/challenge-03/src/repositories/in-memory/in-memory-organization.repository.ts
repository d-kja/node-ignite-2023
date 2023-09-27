import { randomUUID } from 'node:crypto'

import { CreateOrganization, Organization } from '@/@types/repository/entities'
import { OrganizationRepository } from '../organization.repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  private repository: Organization[] = []

  async create(data: CreateOrganization): Promise<Organization> {
    const organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      cep: data.cep,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      created_at: new Date(),
    } satisfies Organization

    this.repository.push(organization)

    return organization
  }
  async update(
    data: Partial<Organization> & { id: string },
  ): Promise<Organization> {
    const organizationIndex = this.repository.findIndex(
      (item) => item.id === data.id,
    )

    if (organizationIndex < 0) {
      throw new Error('Organization not found')
    }

    const organization = this.repository[organizationIndex]

    this.repository[organizationIndex] = {
      ...organization,
      ...data,
    }

    return this.repository[organizationIndex]
  }
  async findById(data: string): Promise<Organization | null> {
    const organization = this.repository.find((item) => item.id === data)

    if (!organization) return null
    return organization
  }
  async findByEmail(data: string): Promise<Organization | null> {
    const organization = this.repository.find((item) => item.email === data)

    if (!organization) return null
    return organization
  }
}
