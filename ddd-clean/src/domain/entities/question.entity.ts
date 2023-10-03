import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-object/slug'

import dayjs from 'dayjs'

interface QuestionConstructor {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  slug: Slug
  title: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionConstructor> {
  get title() {
    return this.props.title
  }
  get slug() {
    return this.props.slug
  }
  get content() {
    return this.props.content
  }
  get excerpt() {
    return this.props.content.substring(0, 120).trimEnd().concat('...')
  }
  get authorId() {
    return this.props.authorId
  }
  get bestAnswerId() {
    return this.props.bestAnswerId
  }
  get createdAt() {
    return this.props.createdAt
  }
  get updatedAt() {
    return this.props.updatedAt
  }
  get isNew() {
    return dayjs(new Date()).diff(this.createdAt, 'days') <= 3
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }
  set content(content: string) {
    this.props.content = content
    this.touch()
  }
  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QuestionConstructor, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        createdAt: new Date(),
        ...props,
      },
      id,
    )

    return question
  }
}
