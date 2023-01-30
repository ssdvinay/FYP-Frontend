import {User} from "./user";

export class Customer {
  constructor(public id: Number,
              public address: String,
              public user: User) {
  }
}
