import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class EventExample<T = any> implements DomainEvent {
  public occurredAt: Date
  private aggregate: AggregateRoot<T>

  constructor(aggregate: AggregateRoot<T>) {
    this.aggregate = aggregate
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class EntityOrServiceThatCreatesTheEvent extends AggregateRoot<null> {
  static async create() {
    const entity = new EntityOrServiceThatCreatesTheEvent(null)

    entity.addDomainEvent(new EventExample(entity))

    return entity
  }
}

describe('@core/domain-events', () => {
  it('should be able to create, pre-publish and also publish the event to the listener/subscriber', async () => {
    const eventName = EventExample.name
    const eventHandler = vi.fn()

    // Creating a new listener with a callback
    DomainEvents.register(eventHandler, eventName)

    // Creating a new useCase/event that publishes a new event
    const pubEntity = await EntityOrServiceThatCreatesTheEvent.create()
    expect(pubEntity.domainEvents).toHaveLength(1)

    /**
     * We don't use the SUB here because the aggregate saved is always the
     * PUBLISHER, when we create a new event with the "entity.addDomainEvent"
     * it uses the "DomainEvents.markAggregatesForDispatch" fn and it saves a
     * reference of the whole class inside the array "markedAggregates..."
     *
     * when we use "dispatchEvents..." we filter that array to find the events
     * created by that instance and execute the appropriate handler according
     * to the EVENT CLASS's NAME, so there's no mistake when doing it that way
     *
     * A bit overcomplicated for a simple process but it happens that way
     * because of the architecture used!
     */
    DomainEvents.dispatchEventsForAggregate(pubEntity.id)

    // Handler needs to be called by now
    expect(eventHandler).toHaveBeenCalled()

    // Clear all the events inside the entity so that we start anew
    expect(pubEntity.domainEvents).toHaveLength(0)
  })
})
