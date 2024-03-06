import { ApiService } from 'src/shared/services/api.service';
import { ThemeService } from 'src/shared/services/theme.service';
import { Endpoints } from 'src/shared/services/endpoints';
import type { EChartsOption } from 'echarts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers:[
    DatePipe
  ]
})
export class ReportsComponent implements OnInit {
  
  isSending;
  form;
  employees;
  filter_data;
  filters;
  id;
  constructor(  private apiService:ApiService,
    public themeService:ThemeService,
    private datePipe:DatePipe,
    private activatedRoute:ActivatedRoute,


    ){ 

    }

  ngOnInit(): void {

    this.form = new FormGroup({
      task_id : new FormControl(),
      job_id : new FormControl(),
      emp_id : new FormControl(),
     
    });


    this.apiService.get(Endpoints.company.filter_data,{limit:false}).subscribe(r => {
      this.employees = r.employees;
      this.filter_data = r;
    });


    

  }



  filter(){
    let value = {...this.form.value};
    value.date_from = this.datePipe.transform(value.date_from , 'yyyy/MM/dd');
    value.date_to = this.datePipe.transform(value.date_to, 'yyyy/MM/dd');

    this.apiService.get(Endpoints.company.reports,value)
    .subscribe(
      r => {
          //saveAs(r, "pretty image")
          this.filters = r;
          this.process_filter();
      }, e => {
       
      }
   )
  }



  process_filter(){
    let sets = this.filters;
  }



}
