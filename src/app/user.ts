export class User {
  constructor(public firstName: String,
              public lastName: String,
              public username: String,
              public email: String,
              public password: String,
              public phoneNumber: String,
              public address: String,
              public role: String,
              public blacklisted: boolean = false,
              public supportedCarTypes: number[] = [],
              public supportedProductTypes: number[] = [],
              public price: number = 0,
              public latitude: number = 0,
              public longitude: number = 0) {
  }
}
