import {User} from "./user";
import {DealerCarProduct} from "./dealer-car-product";
import {RESTAPIService} from "./apiservice.service";

export class Dealer {
  constructor(public id: Number,
              public showRoomAddress: String,
              public approvalStatus: String,
              public user: User,
              public dealerCarProductList: DealerCarProduct[],
              public showroomPicture: String | null = null) {
  }

  get showroomPictureUrl(): String {

    return RESTAPIService.baseApi + 'customer/image/' + this.id + '/' + this.showroomPicture;
  }
}
