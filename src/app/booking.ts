import {DealerAssociationId} from "./dealer-association-id";

export class Booking {

  constructor(public id: Number,
              public customerId: Number,
              public price: Number,
              public bookingStatus: String,
              public bookingDate: String,
              public createdAt: String,
              public dealerAssociationId: DealerAssociationId) {
  }
}
