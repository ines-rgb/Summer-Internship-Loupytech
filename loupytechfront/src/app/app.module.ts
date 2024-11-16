import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { NavbartopComponent } from './navbartop/navbartop.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { ListReportsComponent } from './list-reports/list-reports.component';
import { AddReportComponent } from './add-report/add-report.component';
import { ListMyreportsComponent } from './list-myreports/list-myreports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
    NavbartopComponent,
    ListUsersComponent,
    AddClientComponent,
    AddEmployeComponent,
    ListReportsComponent,
    AddReportComponent,
    ListMyreportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Import AppRoutingModule here
    ReactiveFormsModule,
    FormsModule, // Add FormsModule here
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
