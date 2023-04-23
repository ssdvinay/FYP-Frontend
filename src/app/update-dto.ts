export class UpdateDto {
  constructor(public id: number | null,
              public firstName: String | null,
              public lastName: String | null,
              public username: String | null,
              public email: String | null,
              public password: String | null,
              public phoneNumber: String | null,
              public address: String | null,
              public showroomPicture: String | null,
              public supportedCarTypes: number[] = [],
              public supportedProductTypes: number[] = [],
              public price: number = 0) {
  }
}
