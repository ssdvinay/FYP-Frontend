import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
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

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'signin', component: SigninComponent},
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
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
