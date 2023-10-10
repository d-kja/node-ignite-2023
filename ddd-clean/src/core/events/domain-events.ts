import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'

type DomainEventCallback = (event: any) => void // eslint-disable-line

/**
 * @description
 *
 * Defines the main class to handle listeners/subscribers and
 * publisher methods. The majority of the methods are static and the class
 * contains 2 variables storing the handlers for each subscriber and the
 * second one stores all the Entities that contains events to be published by
 * the repository layer
 */
export class DomainEvents {
  // Contain all the subscribers handlers with their Key for the event (the name of the class)
  private static handlersMap: Record<string, DomainEventCallback[]> = {}

  // Events created but not ready yet
  private static markedAggregates: AggregateRoot<any>[] = [] // eslint-disable-line

  // Create subscriber/register event handler
  public static register(
    callback: DomainEventCallback,
    eventClassName: string,
  ) {
    const wasEventRegisteredBefore = eventClassName in this.handlersMap

    if (!wasEventRegisteredBefore) {
      this.handlersMap[eventClassName] = []
    }

    this.handlersMap[eventClassName].push(callback)
  }

  // Just pushes any aggregate that hasn't been pushed to our markedAggregates array (event exists, but it's not ready to push/publish event yet)
  public static markAggregatesForDispatch(
    aggregate: AggregateRoot<any>, // eslint-disable-line
  ) {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  // finds the event that hasn't been published yet and publishes it, after that it clears any existing event for that aggregate and removes from the marked list
  public static dispatchEventsForAggregate(id: UniqueEntityID) {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  // Use the subscriber handler to publish the events (DB layer only)
  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name

    // Checking if event exists in our pub/sub (validation)
    const isEventRegistered = eventClassName in this.handlersMap

    if (isEventRegistered) {
      const handlers = this.handlersMap[eventClassName]

      for (const handler of handlers) {
        handler(event)
      }
    }
  }

  private static findMarkedAggregateByID(id: UniqueEntityID):
    | AggregateRoot<any> // eslint-disable-line
    | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id.equals(id))
  }

  private static dispatchAggregateEvents(
    aggregate: AggregateRoot<any>, // eslint-disable-line
  ) {
    aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>, // eslint-disable-line
  ) {
    const index = this.markedAggregates.findIndex((item) =>
      item.equals(aggregate),
    )

    this.markedAggregates.splice(index, 1)
  }

  public static clearHandlers() {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates() {
    this.markedAggregates = []
  }
}
