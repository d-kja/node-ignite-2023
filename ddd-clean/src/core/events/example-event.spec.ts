import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class EventExample implements DomainEvent {
  public occurredAt: Date
  public aggregate: AggregateRoot<any>

  constructor(aggregate: AggregateRoot<any>) {
    this.aggregate = aggregate
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class SubscriberExample extends AggregateRoot<any> {
  static create() {
    const entity = new SubscriberExample(null)

    entity.addDomainEvent(new EventExample(entity))

    return entity
  }
}

// Doing it out of memory to recall the workflow of the SUB/PUB concept
describe('example event', () => {
  it.skip('should be able to create an event', async () => {
    const eventHandler = vi.fn()
    const eventName = EventExample.name

    DomainEvents.register(eventHandler, eventName)

    const publisherEntity = SubscriberExample.create()

    expect(publisherEntity.domainEvents).toHaveLength(1)

    DomainEvents.dispatchEventsForAggregate(publisherEntity.id)

    expect(eventHandler).toHaveBeenCalled()
    expect(publisherEntity.domainEvents).toHaveLength(0)
  })
})
