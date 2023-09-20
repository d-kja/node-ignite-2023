export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail provided already in use')
  }
}
