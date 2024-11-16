import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ReportService} from "../Services/report.service";
import {Router} from "@angular/router";
import {SweetAlertService} from "../Services/sweet-alert.service";

@Component({
  selector: 'app-list-myreports',
  templateUrl: './list-myreports.component.html',
  styleUrls: ['./list-myreports.component.css']
})
export class ListMyreportsComponent {
  reports :  any[] = [];
  filteredReports: any[] = [];
  reportsAll :any [] = [];

  searchText: string = '';
  addForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private reportService:ReportService,private router:Router ,private sweetAlertService: SweetAlertService) {
  }
  ngOnInit() {
    this.getReports();
  }
  getReports(): void {
    this.reportService.getMyReports().subscribe(
        (response: any) => {
          console.log('Reports:', response);
          this.reports=response;
          this.reportsAll=response;
        },
        error => {
          console.error('Error fetching Reports:', error);
        }
    );
  }


  onSearch(): void {

    this.reports = this.reportsAll;
    console.log(this.searchText.toLowerCase());
    console.log("hello");


    const searchTextLower = this.searchText.toLowerCase();
    this.filteredReports = this.reports.filter(report => {
      return report.title.toLowerCase().includes(searchTextLower) ||
          report.title.toLowerCase().includes(searchTextLower) ||
          report.description.toString().toLowerCase().includes(searchTextLower) ||
          report.dateCreated.toLowerCase().includes(searchTextLower) ;
    });

    this.reports=this.filteredReports;
  }

  downloadPdf(base64String: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'report.pdf'; // Name the downloaded file
    link.click();
    window.URL.revokeObjectURL(link.href);
  }


}
