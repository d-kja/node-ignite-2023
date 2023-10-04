import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface StudentConstructor {
  name: string
}

export class Student extends Entity<StudentConstructor> {
  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  static create(props: StudentConstructor, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }
}
