export class MyCustomerDto {
  constructor(public name: string,
              public phoneNumber: string,
              public email: String,
              public totalBookings: number,
              public totalComplaints: number) {
  }
}
