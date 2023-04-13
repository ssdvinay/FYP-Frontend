import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { AllcustomersComponent } from './allcustomers/allcustomers.component';
import { DealerdetailsComponent } from './dealerdetails/dealerdetails.component';
import { AlldealersComponent } from './alldealers/alldealers.component';
import { AdminComponent } from './admin/admin.component';
import { ApprovalComponent } from './approval/approval.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { AllshowroomsComponent } from './allshowrooms/allshowrooms.component';
import { CustomerheaderComponent } from './customerheader/customerheader.component';
import { NotfoundComponent } from './notfound/notfound.component';

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
    NotfoundComponent
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
export class AppModule { }
