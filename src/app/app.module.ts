import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SigninComponent} from './signin/signin.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomepageComponent} from './homepage/homepage.component';
import {CustomerdetailsComponent} from './customerdetails/customerdetails.component';
import {AllcustomersComponent} from './allcustomers/allcustomers.component';
import {DealerdetailsComponent} from './dealerdetails/dealerdetails.component';
import {AlldealersComponent} from './alldealers/alldealers.component';
import {AdminComponent} from './admin/admin.component';
import {ApprovalComponent} from './approval/approval.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AdminloginComponent} from './adminlogin/adminlogin.component';
import {BlacklistComponent} from './blacklist/blacklist.component';
import {AllshowroomsComponent} from './allshowrooms/allshowrooms.component';
import {CustomerheaderComponent} from './customerheader/customerheader.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {CustomerhomepageComponent} from './customerhomepage/customerhomepage.component';
import { DealerhomepageComponent } from './dealerhomepage/dealerhomepage.component';
import { DealerheaderComponent } from './dealerheader/dealerheader.component';
import { CustomerloginComponent } from './customerlogin/customerlogin.component';
import { DealerloginComponent } from './dealerlogin/dealerlogin.component';
import { EditDealerDetailsComponent } from './edit-dealer-details/edit-dealer-details.component';
import { EditCustomerProfileComponent } from './edit-customer-profile/edit-customer-profile.component';
import { CustomerComplaintComponent } from './customer-complaint/customer-complaint.component';
import { ComplaintsPageComponent } from './complaints-page/complaints-page.component';
import { CustomerBookingPageComponent } from './customer-booking-page/customer-booking-page.component';
import { CustomerBookingsListComponent } from './customer-bookings-list/customer-bookings-list.component';
import { DealerBookingsListComponent } from './dealer-bookings-list/dealer-bookings-list.component';
import { AdminBookingsListComponent } from './admin-bookings-list/admin-bookings-list.component';
import { DealerCustomersListComponent } from './dealer-customers-list/dealer-customers-list.component';
import { DealerDetailsModalComponent } from './dealer-details-modal/dealer-details-modal.component';
import { CustomerDetailsModalComponent } from './customer-details-modal/customer-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomepageComponent,
    CustomerdetailsComponent,
    AllcustomersComponent,
    DealerdetailsComponent,
    AlldealersComponent,
    AdminComponent,
    ApprovalComponent,
    HeaderComponent,
    FooterComponent,
    AdminloginComponent,
    BlacklistComponent,
    AllshowroomsComponent,
    CustomerheaderComponent,
    NotfoundComponent,
    CustomerhomepageComponent,
    DealerhomepageComponent,
    DealerheaderComponent,
    CustomerloginComponent,
    DealerloginComponent,
    EditDealerDetailsComponent,
    EditCustomerProfileComponent,
    CustomerComplaintComponent,
    ComplaintsPageComponent,
    CustomerBookingPageComponent,
    CustomerBookingsListComponent,
    DealerBookingsListComponent,
    AdminBookingsListComponent,
    DealerCustomersListComponent,
    DealerDetailsModalComponent,
    CustomerDetailsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
