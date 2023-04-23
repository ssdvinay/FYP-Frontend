export class CustomerUpdateDto {
  constructor(public id: number | null,
              public firstName: String | null,
              public lastName: String | null,
              public phoneNumber: String | null,
              public email: String | null,
              public username: String | null,
              public address: String | null,
              public password: String | null) {
  }
}
