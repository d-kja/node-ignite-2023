import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentConstructor } from './comment.entity'

export interface QuestionCommentConstructor extends CommentConstructor {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentConstructor> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentConstructor, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const question = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
