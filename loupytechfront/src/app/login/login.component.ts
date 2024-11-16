import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountService} from "../Services/account.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private accountService: AccountService , private router: Router) {

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("submit");
    console.warn(this.loginForm.value);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.accountService.login(this.loginForm.value.email!,this.loginForm.value.password!).subscribe(
        (response:any) => {
          // Handle successful login response
          console.log('Login successful', response);

          sessionStorage.setItem("idAccount",response.idAccount);
          sessionStorage.setItem("firstname",response.firstname);
          sessionStorage.setItem("lastname",response.lastname);
          sessionStorage.setItem("token",response.token);
          sessionStorage.setItem("email",response.email);
          sessionStorage.setItem("password",response.password);
          sessionStorage.setItem("role",response.role);
          sessionStorage.setItem("datecreation",response.datecreation);


          if(response.role==="ADMIN")
            this.router.navigate(['/list-users']);
          if(response.role==="CLIENT")
            this.router.navigate(['/list-myreports',response.idAccount]);

          // Redirect or do something else
        },
        error => {
          // Handle login error
          console.error('Login error', error);
        }
      );
    }
  }



}
