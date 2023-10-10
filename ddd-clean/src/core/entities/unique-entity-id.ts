import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private id: string

  toString() {
    return this.id
  }

  toValue() {
    return this.id
  }

  public equals(id: UniqueEntityID) {
    return id.toValue() === this.id
  }

  constructor(id?: string) {
    this.id = id ?? randomUUID()
  }
}
