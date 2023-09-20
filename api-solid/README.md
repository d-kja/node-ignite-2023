# Application

It consists of a Gym Pass style application.

## FRs (Functional requirements)

The functionality of the application, what can the user do within our application.

- [x] Should be able to register a new user
- [ ] Should be able to authenticate an existing user
- [ ] Should be able get the data of a specific user

- [ ] Should be able to check-in with the application (_`linked with the first BR`_)
- [ ] Should be able to get the total check-ins of a user
- [ ] Should be able to validate the check-in of a user
- [ ] Should be able to check-in with a specific gym

- [ ] Should be able to register a new gym
- [ ] Should be able to search for available nearby gyms
- [ ] Should be able to search for gyms by querying their name

## BRs (Business rules)

Business rules are the paths that each requirement can take, choices that can be made with 'em. It basically says ok we have this functionality, right? But we need to impose certain limits to improve it.

Let's say I have an X functionality but I need to impose certain conditions for that to work so I can say that I only accept or allow that to happen if and only if the X is equals to e.g. 100 or more.

```rust
  let mut X = 0;

  if X >= 10 {
    // ... do something here
  } else {
    panic!("can't do it cuz X doesn't meet the requirements...");
  }
```

---

- [ ] Shouldn't be able to register with a duplicated e-mail

- [ ] The gym can only be registered by admins

- [ ] The check-in can only be validated by admins
- [ ] The check-in can only be validated within a span of 20 minutes
- [ ] The user can only make a check-in if he's within 100m away from the gym

## NFRs (Non functional requirements)

They are more technical requirements than functional ones. For example, the stack used within a project or the strategy/architecture

- [ ] The user's password needs to be encrypted
- [ ] The data of the application needs to be persisted with a PostgreSQL database
- [ ] All the data lists needs a pagination of 20 items per page
- [ ] The user needs to be identified with a JWT (JSON Web Token)
