import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface InstructorConstructor {
  name: string
}

export class Instructor extends Entity<InstructorConstructor> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  static create(props: InstructorConstructor, id?: UniqueEntityID) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
