import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {DealerComponent} from "./signup/dealer/dealer.component";
import {CustomerComponent} from "./signup/customer/customer.component";
import {AdminComponent} from "./admin/admin.component";
import {ApprovalComponent} from "./approval/approval.component";
import {AllcustomersComponent} from "./allcustomers/allcustomers.component";
import {AlldealersComponent} from "./alldealers/alldealers.component";
import {CustomerdetailsComponent} from "./customerdetails/customerdetails.component";
import {DealerdetailsComponent} from "./dealerdetails/dealerdetails.component";
import {AdminloginComponent} from "./adminlogin/adminlogin.component";
import {BlacklistComponent} from "./blacklist/blacklist.component";
import {AllshowroomsComponent} from "./allshowrooms/allshowrooms.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {CustomerhomepageComponent} from "./customerhomepage/customerhomepage.component";
import {DealerhomepageComponent} from "./dealerhomepage/dealerhomepage.component";
import {CustomerloginComponent} from "./customerlogin/customerlogin.component";
import {DealerloginComponent} from "./dealerlogin/dealerlogin.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'admin/homepage', component: AdminComponent},
  {path: 'customer/login', component: CustomerloginComponent},
  {path: 'dealer/login', component: DealerloginComponent},
  {path: 'dealer/signup', component: DealerComponent},
  {path: 'admin/approval', component: ApprovalComponent},
  {path: 'customer/signup', component: CustomerComponent},
  {path: 'admin/customers', component: AllcustomersComponent},
  {path: 'admin/customers/:id', component: CustomerdetailsComponent},
  {path: 'admin/dealers', component: AlldealersComponent},
  {path: 'admin/dealers/:id', component: DealerdetailsComponent},
  {path: 'admin/login', component: AdminloginComponent},
  {path: 'admin/blacklist', component: BlacklistComponent},
  {path: 'customer/showrooms', component: AllshowroomsComponent},
  {path: 'customer/homepage', component: CustomerhomepageComponent},
  {path: 'dealer/homepage', component: DealerhomepageComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
