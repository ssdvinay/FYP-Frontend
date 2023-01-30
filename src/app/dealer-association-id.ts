import {CarType} from "./car-type";
import {ProductType} from "./product-type";

export class DealerAssociationId {

  constructor(public dealerId: Number,
              public carTypeId: Number,
              public productTypeId: Number,
              public carType: CarType,
              public productType: ProductType) {
  }
}
