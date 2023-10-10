import { UniqueEntityID } from '../entities/unique-entity-id'

/**
 * @description it creates the structure for an event soon to be published
 */
export interface DomainEvent {
  occurredAt: Date
  getAggregateId(): UniqueEntityID
}
