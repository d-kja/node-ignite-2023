# ddd-clean

[Definition reference](https://efficient-sloth-d85.notion.site/Gloss-rio-DDD-3a81b4df36d348a299ccbc53f38a1665)

## Aggregates

Root entities, they work like a root class that manages more than one entity/class

Let's say we got a chat application and each message can contain an attachment. The Attachment itself could be an entity within our application and the Message entity could manage that Attachment entity within it.

The idea behind of it is to put the rules of the sub-entity within the root-entity and only let the root-entity/root-aggregate manage the business rules for that sub-class.

For example, the root-aggregate repository has a delete method to remove the message from the database, with that we know that the sub-class also needs to be delete at the same time and for that reason we keep that rule within the root-aggregate repository class

## Watched-lists

Basically a list that watches every change of it's items, be it add, remove, or updates. It keeps the information of what was added, deleted and automatically updates the current values of that list.

The reason it does that is just so that your database doesn't need to do that job by itself, making it more efficient

## Sub-domains (bounded-contexts)

As the domain is the whole application the sub-domain are parts of our application and they're split in 3 categories:

- **Core**: everything in our app that needs to be working all the time "things that give us money or keep the core functionality working"
- **Supporting**: anything that helps the core work correctly
- **Generic**: things that we need but aren't that important for the application

### E-commerce example for sub-domains

- Notifications

#### Core

- Buy functionality
- Catalog
- Payment
- Delivery

#### Supporting

- Stock

#### Generic

- Support chat
- Notifications
- Discounts
