# Find a friend API (Challenge)

## Functional requirements

- [ ] Should be able to register a new **pet**
- [ ] Should be able to list all the **pets available for adoption in a specific city**
- [ ] Should be able to filter the pets **by their characteristics**
- [ ] Should be able to visualize the **details of a pet available for adoption**
- [ ] Should be able to **register as an ORG**
- [ ] Should be able to **login as an ORG**

## Business rules

- [ ] Should require the city when trying to **list the pets**
- [ ] Should require Whatsapp and address for each **ORG**
- [ ] A pet should be connected to an ORG
- [ ] When a user wants to adopt a pet, he should get in contact with the ORG through Whasapp
- [ ] Every filter besides the city are optional
- [ ] The ORG needs to login in order to access the application as an administrator

## Non-Functional requirements

- [ ] Passwords needs to be encrypted before persisting the data
- [ ] The data of the application needs to be persisted with a PostgreSQL database
- [ ] Any route used to list data needs pagination
- [ ] The user is going to be identified through a JWT Token

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
