import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AccountService} from "../Services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit{

  Form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    postalCode: new FormControl(''),
    email: new FormControl(''),

  });
  constructor(private accountService: AccountService , private router: Router) {}

  ngOnInit() {


  }



  onSubmit(): void {
    console.warn(this.Form.value);
    if (this.Form.valid) {
      const {
        firstname,
        lastname,
        password,
        address,
        country,
        email,
        postalCode,
        city,
      } = this.Form.value;

      this.accountService.addClient(this.Form.value.firstname!,this.Form.value.lastname!,this.Form.value.email!
        ,this.Form.value.password!,this.Form.value.address!,this.Form.value.city!,this.Form.value.country!
        ,this.Form.value.postalCode!
      ).subscribe(
        (response:any) => {
          // Handle successful login response
          console.log('Add Client succesfull', response);
          this.router.navigate(['/list-users']);

        },
        error => {
          // Handle login error
          console.error('Login error', error);
        }
      );

      console.log(this.Form.value);
    } else {
      // Handle form validation errors
      console.error('Form validation failed.');
    }
  }
}
