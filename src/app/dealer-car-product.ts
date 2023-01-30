import {DealerAssociationId} from "./dealer-association-id";

export class DealerCarProduct {
  constructor(public dealerAssociationId: DealerAssociationId,
              public price: number) {
  }
}
