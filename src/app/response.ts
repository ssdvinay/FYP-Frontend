export class Response<T> {
  constructor(public body: T, public error: String) {
  }
}
