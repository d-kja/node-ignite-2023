import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AttachmentConstructor {
  title: string
  link: string
}

export class Attachment extends Entity<AttachmentConstructor> {
  get title(): string {
    return this.props.title
  }

  get link(): string {
    return this.props.link
  }

  static create(props: AttachmentConstructor, id?: UniqueEntityID) {
    return new Attachment(props, id)
  }
}
