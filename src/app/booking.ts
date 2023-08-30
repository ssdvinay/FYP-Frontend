import {DealerAssociationId} from "./dealer-association-id";
import {Dealer} from "./dealer";
import {CarType} from "./car-type";
import {ProductType} from "./product-type";
import {Customer} from "./customer";

export class Booking {

  constructor(public id: number,
              public customerId: Number,
              public price: Number,
              public bookingStatus: String,
              public bookingDate: String,
              public bookingTime: String,
              public createdAt: String,
              public dealerAssociationId: DealerAssociationId,
              public dealer: Dealer | null = null,
              public customer: Customer | null = null,
              public carType: CarType | null = null,
              public productType: ProductType | null = null,
              public feedback: String | null = null,
              public rating: Number | null = null) {
  }
}
