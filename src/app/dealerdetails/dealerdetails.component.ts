import {Component, OnInit} from '@angular/core';
import {RESTAPIService} from "../apiservice.service";
import {Dealer} from "../dealer";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../response";
import {ActivatedRoute, Router} from "@angular/router";
import {Util} from "../util";
import {DealerCarProduct} from "../dealer-car-product";

@Component({
  selector: 'app-dealerdetails',
  templateUrl: './dealerdetails.component.html',
  styleUrls: ['./dealerdetails.component.css']
})
export class DealerdetailsComponent implements OnInit {

  dealer: any

  constructor(private apiService: RESTAPIService, private route: ActivatedRoute, private router: Router) {
  }

  getDealerDetails(dealerId: Number) {
    this.apiService.getDealerDetails(dealerId).subscribe({
        next: (value: HttpResponse<Response<Dealer>>) => {
          return this.dealer = value.body;
        },
        error: err => Util.handleUnauthorized(err, this.router),
      }
    )
  }

  includesCar(car: number): boolean {
    let result: boolean = false
    this.dealer.dealerCarProductList.forEach(function (dealerCarProduct: DealerCarProduct) {
      if (!result)
        result = dealerCarProduct.dealerAssociationId.carTypeId == car
    })
    return result
  }

  includesProduct(product: number): boolean {
    let result: boolean = false
    this.dealer.dealerCarProductList.forEach(function (dealerCarProduct: DealerCarProduct) {
      if (!result)
        result = dealerCarProduct.dealerAssociationId.productTypeId == product
    })
    return result
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.getDealerDetails(value['id'])
    })
  }
}
