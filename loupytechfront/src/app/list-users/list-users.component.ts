import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {AccountService} from "../Services/account.service";


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  accounts :  any[] = [];
  filteredAccounts: any[] = [];
  accountsAll :any [] = [];

  searchText: string = '';
  addForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private accountService:AccountService,private router:Router) {
  }
  ngOnInit() {
    this.getCustomers();
  }
  getCustomers(): void {
    this.accountService.getAllAccounts().subscribe(
      (response: any) => {
        // Handle successful response
        console.log('Accounts:', response);
        this.accounts=response;
        this.accountsAll=response;
        // You can assign the response to a variable to use in your template
      },
      error => {
        // Handle error
        console.error('Error fetching Accounts:', error);
      }
    );
  }


  onSearch(): void {

    this.accounts = this.accountsAll;
    console.log(this.searchText.toLowerCase());


    const searchTextLower = this.searchText.toLowerCase();
    this.filteredAccounts = this.accounts.filter(account => {
      return account.firstname.toLowerCase().includes(searchTextLower) ||
        account.lastname.toLowerCase().includes(searchTextLower) ||
        account.email.toString().toLowerCase().includes(searchTextLower) ||
        account.role.toLowerCase().includes(searchTextLower) ||
        account.address.toLowerCase().includes(searchTextLower) ||
        account.postalCode.toLowerCase().includes(searchTextLower) ||
        account.country.toLowerCase().includes(searchTextLower) ||
        account.city.toLowerCase().includes(searchTextLower) ||
        account.email.toLowerCase().includes(searchTextLower) ;
    });

    this.accounts=this.filteredAccounts;
  }

}
