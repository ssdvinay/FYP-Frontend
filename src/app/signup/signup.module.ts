import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerComponent } from './dealer/dealer.component';
import { CustomerComponent } from './customer/customer.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    DealerComponent,
    CustomerComponent
  ],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class SignupModule { }
