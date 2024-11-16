import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ListUsersComponent} from "./list-users/list-users.component";
import {AddClientComponent} from "./add-client/add-client.component";
import {AddEmployeComponent} from "./add-employe/add-employe.component";
import {ListReportsComponent} from "./list-reports/list-reports.component";
import {AddReportComponent} from "./add-report/add-report.component";
import {ListMyreportsComponent} from "./list-myreports/list-myreports.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'list-customer', component: ListCustomerComponent },
  { path: 'add-client', component: AddClientComponent },
  { path: 'add-employe', component: AddEmployeComponent },

  // { path: 'add-account', component: AddAccountComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'list-reports', component: ListReportsComponent },
  { path: 'add-report/:idAccount', component: AddReportComponent },
  { path: 'list-myreports/:idAccount', component: ListMyreportsComponent },

  //{path : 'details-customer/:idCustomer' , component : DetailsCustomerComponent},
  //{path : 'details-account/:idAccount' , component : DetailsAccountComponent},


  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login if no path specified
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
