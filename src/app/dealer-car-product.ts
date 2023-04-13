import {DealerAssociationId} from "./dealer-association-id";
import {Dealer} from "./dealer";

export class DealerCarProduct {
  constructor(public dealerAssociationId: DealerAssociationId,
              public price: number,
              public dealer: Dealer) {
  }
}
