import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AccountService} from "../Services/account.service";
import {Router} from "@angular/router";
import {ReportService} from "../Services/report.service";
import {SweetAlertService} from "../Services/sweet-alert.service";

@Component({
  selector: 'app-list-reports',
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.css']
})
export class ListReportsComponent {
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
    this.reportService.getAllReports().subscribe(
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
        report.client.firstname.toLowerCase().includes(searchTextLower) ||
        report.client.lastname.toLowerCase().includes(searchTextLower) ||
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

  async onDelete(idReport :any) {
    const confirmed = await this.sweetAlertService.showDeleteConfirmation();
    if (confirmed) {
      this.onSubmitDelete(idReport);
    }
  }
  onSubmitDelete(id: any) {

    this.reportService.deleteReport(id).subscribe(
        () => {
          // Handle successful deletion
          console.log('Report deleted successfully');

          // Optionally, you can fetch the updated list of users after deletion
          this.getReports();
        },
        error => {
          // Handle error
          console.error('Error deleting Reports:', error);
        }
    );

  }


}
