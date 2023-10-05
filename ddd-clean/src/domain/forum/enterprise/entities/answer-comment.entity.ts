import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentConstructor } from './comment.entity'

export interface AnswerCommentConstructor extends CommentConstructor {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentConstructor> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentConstructor, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answer = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }
}
