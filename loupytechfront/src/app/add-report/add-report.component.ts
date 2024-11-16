import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ReportService} from "../Services/report.service";

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit{
  idAccount: any;
  selectedFile: File | null = null;


  Form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    pdf: new FormControl(''),
    idAccount: new FormControl('')

  });
  constructor(private reportService: ReportService , private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.idAccount = params['idAccount'];
    });

    console.log(this.idAccount);


  }


  onSubmit(): void {
    if (this.Form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.Form.value.title!);
      formData.append('description', this.Form.value.description!);
      formData.append('pdf', this.selectedFile, this.selectedFile.name);

      this.reportService.uploadReport(formData, this.idAccount).subscribe(
          (response: any) => {
            console.log('Upload report successful', response);
            this.router.navigate(['/list-reports']);
          },
          error => {
            console.error('Upload error', error);
          }
      );
    } else {
      console.error('Form validation failed or file not selected.');
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

}
