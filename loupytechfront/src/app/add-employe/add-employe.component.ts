import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../Services/account.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent  implements OnInit{

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

      this.accountService.addEmploye(this.Form.value.firstname!,this.Form.value.lastname!,this.Form.value.email!
        ,this.Form.value.password!,this.Form.value.address!,this.Form.value.city!,this.Form.value.country!
        ,this.Form.value.postalCode!
      ).subscribe(
        (response:any) => {
          // Handle successful login response
          console.log('Add Employe succesfull', response);
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
