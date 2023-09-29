type PetAgeEnum = 'NEW' | 'NEUTRAL' | 'OLD'
type PetSizeEnum = 'SMOL' | 'NORMAL' | 'LARGE'

type PetEnergyEnum = 1 | 2 | 3 | 4 | 5
type PetIndependenceEnum = 1 | 2 | 3

/**
 * @description
 *
 * Defines the entity Pet for the repositories,
 *
 * ---
 * for input requirements use:
 * ```ts
 * interface CreatePet
 * ```
 */
export interface Pet {
  id: string
  name: string
  description: string
  images: string[]
  age: PetAgeEnum
  size: PetSizeEnum
  energy: PetEnergyEnum
  independence: PetIndependenceEnum
  isClaustrophobic: boolean
  isAdopted: boolean
  otherRequirements: string[]
  state: string
  city: string
  user_id: string
  created_at: Date
}

export interface CreatePet {
  id?: string
  name: string
  description: string
  images?: string[]
  age?: PetAgeEnum
  size?: PetSizeEnum
  energy: PetEnergyEnum
  independence: PetIndependenceEnum
  isClaustrophobic: boolean
  isAdopted?: boolean
  otherRequirements?: string[]
  state: string
  city: string
  user_id: string
}

export type UserRolesEnum = 'MEMBER' | 'ORGANIZATION'

/**
 * @description
 *
 * Defines the entity Organization for the repositories
 *
 * ---
 * for input requirements use:
 * ```ts
 * interface CreateOrganization
 * ```
 */
export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  cep: string
  address: string
  whatsapp: string
  role: UserRolesEnum
  created_at: Date
}

export interface CreateUser {
  id?: string
  name: string
  email: string
  password_hash: string
  cep: string
  address: string
  whatsapp: string
  role?: UserRolesEnum
  created_at?: Date | string
}
