import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Slug } from './value-object/slug'

import { AggregateRoot } from '@/core/entities/aggregate-root'
import dayjs from 'dayjs'
import { QuestionAttachmentList } from './question-attachment-list.entity'

export interface QuestionConstructor {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  slug: Slug
  title: string
  content: string
  attachments: QuestionAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export type CreateQuestionRequest = Optional<
  QuestionConstructor,
  'createdAt' | 'slug' | 'attachments'
>

export class Question extends AggregateRoot<QuestionConstructor> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
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

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
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

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: CreateQuestionRequest, id?: UniqueEntityID) {
    const question = new Question(
      {
        ...props,
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
      },
      id,
    )

    return question
  }
}
