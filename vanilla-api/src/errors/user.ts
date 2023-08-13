export class UserError extends Error {
  super(message: string) {
    this.message = message
  }
}
