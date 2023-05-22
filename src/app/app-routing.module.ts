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
import {EditDealerDetailsComponent} from "./edit-dealer-details/edit-dealer-details.component";
import {EditCustomerProfileComponent} from "./edit-customer-profile/edit-customer-profile.component";
import {CustomerComplaintComponent} from "./customer-complaint/customer-complaint.component";
import {ComplaintsPageComponent} from "./complaints-page/complaints-page.component";
import {CustomerBookingPageComponent} from "./customer-booking-page/customer-booking-page.component";
import {CustomerBookingsListComponent} from "./customer-bookings-list/customer-bookings-list.component";
import {DealerBookingsListComponent} from "./dealer-bookings-list/dealer-bookings-list.component";
import {AdminBookingsListComponent} from "./admin-bookings-list/admin-bookings-list.component";
import {DealerCustomersListComponent} from "./dealer-customers-list/dealer-customers-list.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'admin/homepage', component: AdminComponent},
  {path: 'customer/login', component: CustomerloginComponent},
  {path: 'dealer/login', component: DealerloginComponent},
  {path: 'dealer/signup', component: DealerComponent},
  {path: 'dealer/bookings', component: DealerBookingsListComponent},
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
  {path: 'customer', component: CustomerhomepageComponent},
  {path: 'dealer', component: DealerhomepageComponent},
  {path: 'dealer/homepage', component: DealerhomepageComponent},
  {path: 'dealer/myCustomers', component: DealerCustomersListComponent},
  {path: 'dealer/profile', component: EditDealerDetailsComponent},
  {path: 'customer/profile', component: EditCustomerProfileComponent},
  {path: 'customer/complain', component: CustomerComplaintComponent},
  {path: 'customer/booking', component: CustomerBookingPageComponent},
  {path: 'customer/bookings', component: CustomerBookingsListComponent},
  {path: 'admin/complaints', component: ComplaintsPageComponent},
  {path: 'admin/bookings', component: AdminBookingsListComponent},
  { path: 'admin/complaints/all-complaints', component: ComplaintsPageComponent },
  { path: 'admin/complaints/dealer-complaints', component: ComplaintsPageComponent },
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
