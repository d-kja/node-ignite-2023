# Find a friend API (Challenge)

## Functional requirements

- [x] Should be able to register a new **pet**
- [x] Should be able to list all the **pets available for adoption in a specific city**
- [x] Should be able to filter the pets **by their characteristics**
- [x] Should be able to visualize the **details of a pet available for adoption**
- [x] Should be able to **register as an ORG**
- [x] Should be able to **login as an ORG**

## Business rules

- [x] Should require the city when trying to **list the pets**
- [x] Should require Whatsapp and address for each **ORG**
- [x] A pet should be connected to an ORG
- [ ] ~~When a user wants to adopt a pet, he should get in contact with the ORG through Whasapp~~ `# was it supposed to be a route just for that??`
- [x] Every filter besides the city are optional
- [x] The ORG needs to login in order to access the application as an administrator

## Non-Functional requirements

- [x] Passwords needs to be encrypted before persisting the data
- [x] The data of the application needs to be persisted with a PostgreSQL database
- [x] Any route used to list data needs pagination
- [x] The user is going to be identified through a JWT Token

### Repository

- [x] Create in-memory repository for testing purposes
- [x] Create prisma repository

### Tests

- [x] Unit testing for the use cases/services
- [x] E2E tests for the controller routes

### Github Actions

- [ ] Create workflow for the Unit tests
- [ ] Create workflow for the E2E

## Entities

#### ORG

- **Name** -> string
- **E-mail** -> string
- **Password hash** -> string
- **CEP** -> number
- **Address** -> string
- **Whatsapp** -> string

#### Animal for adoption

- **Name** -> string
- **Description** -> string
- **Age** -> new | neutral | old
- **Size** -> small | medium | large

- **Images** -> string[] `# use an Imgur image idk or S3`

- **State** -> string
- **City** -> string

- **Level of energy** -> number 1...5? `# How energetic he is`
- **Independence level** -> number 1...5?
- **Is claustrophobic** -> boolean
- **Other requirements** -> string[]
