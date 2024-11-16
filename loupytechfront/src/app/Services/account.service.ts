import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private ApiUrl = 'http://localhost:8080/account/'; // Replace with your actual login endpoint URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.ApiUrl+"login", { username, password });
  }
  getAllAccounts(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+"getAccounts",{headers:headers});

  }

  addEmploye(
    firstname:any
    ,lastname:any
    ,email:any
    ,password:any
    ,address:any
    ,city:any
    ,country:any
    ,postalCode:any

  ): Observable<any> {
    const token = sessionStorage.getItem('token');
    const idAccount = sessionStorage.getItem('idAccount');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(this.ApiUrl+"addEmploye", {
      firstname
      ,lastname
      ,email
      ,password
      ,address
      ,city
      ,country
      ,postalCode
    },{headers:headers});
  }

  addClient(
    firstname:any
    ,lastname:any
    ,email:any
    ,password:any
    ,address:any
    ,city:any
    ,country:any
    ,postalCode:any

  ): Observable<any> {
    const token = sessionStorage.getItem('token');
    const idAccount = sessionStorage.getItem('idAccount');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(this.ApiUrl+"addClient/"+idAccount, {
      firstname
      ,lastname
      ,email
      ,password
      ,address
      ,city
      ,country
      ,postalCode
    },{headers:headers});
  }


}
