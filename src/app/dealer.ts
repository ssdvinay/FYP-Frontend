import {User} from "./user";
import {DealerCarProduct} from "./dealer-car-product";

export class Dealer {
  constructor(public id: Number,
              public showRoomAddress: String,
              public approvalStatus: String,
              public user: User,
              public dealerCarProductList: DealerCarProduct[]) {
  }
}
