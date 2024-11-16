import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private ApiUrl = 'http://localhost:8080/report/'; // Replace with your actual login endpoint URL

  constructor(private http: HttpClient) { }

  getAllReports(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+"getReports",{headers:headers});

  }
  getMyReports(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const idAccount = sessionStorage.getItem('idAccount');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.ApiUrl+"getReportByClientId/"+idAccount,{headers:headers});

  }

  uploadReport(formData: FormData, idAccount: any): Observable<any> {
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(`${this.ApiUrl}uploadReport/${idAccount}`, formData, { headers: headers });
  }

  deleteReport(idReport: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.delete(this.ApiUrl + "deleteReport/" + idReport, { headers: headers });
  }


}
