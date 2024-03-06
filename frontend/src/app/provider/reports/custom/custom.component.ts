
import { ApiService } from 'src/shared/services/api.service';
import { ThemeService } from 'src/shared/services/theme.service';
import { Endpoints } from 'src/shared/services/endpoints';
import type { EChartsOption } from 'echarts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
  providers:[
    DatePipe
  ]
})
export class CustomComponent implements OnInit {
  @Input('paginationId') paginationId = 'TablePagination';

  constructor(
    private apiService:ApiService,
    public themeService:ThemeService,
    private datePipe:DatePipe,
    private router:Router,
    private route: ActivatedRoute,

  ){ 

  }


  toppings;
  toppingList;
  form;
  isSending = false;
  employees;
  filter_data;
  filters;
  exportType;
  ngOnInit(): void {
    this.toppings = new FormControl('');
    this.toppingList  = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


    this.form = new FormGroup({
      company_id : new FormControl(),
      task_id : new FormControl(),
      job_id : new FormControl(),
      emp_id : new FormControl(),
      interval : new FormControl(),
      month : new FormControl(),
      year : new FormControl(),
      date_from : new FormControl(),
      date_to : new FormControl(),
      report_type : new FormControl(),
      course_id : new FormControl(),
      exportType : new FormControl(),
    });

    this.apiService.get(Endpoints.provider.filter_data,{limit:false}).subscribe(r => {
      this.employees = r.employees;
      this.filter_data = r;
    });

  }

  totals = {};
  per_pages = {};
  page_names = {};
  current_pages = {};
  filter(submit = true){
  
    if(submit){
      Object.keys(this.page_names).forEach(key => {
        let test = this.page_names[key];
        if(this.form?.controls[test]){
            this.form.controls[test].setValue(1);
        }
      });
    }

    let value = {...this.form.value};
    value.date_from = this.datePipe.transform(value.date_from , 'yyyy/MM/dd');
    value.date_to = this.datePipe.transform(value.date_to, 'yyyy/MM/dd');
    value.exportType = this.exportType;

    //this.offset = (this.page - 1) * this.per_page;
    
   /*  offset: this.offset,
    sorting: 'creationtime desc',
    limit: this.per_page,
    per_page: this.per_page,
    ...this.filterModel,
    page:this.page */


    
    this.totals,
    this.per_pages ,
    this.page_names,
    this.current_pages = {};


    if(this.exportType == 'pdf' || this.exportType == 'excel' ){
      this.apiService.getFile(Endpoints.provider.custom,value).subscribe(r => {
        this.filters = r;
        if(this.exportType != ''){
            saveAs(r, "report");
            this.exportType = '';
        }
        this.process_filter();
      });
    }else{
      this.apiService.get(Endpoints.provider.custom,value).subscribe(r => {
        this.filters = r;
        this.process_filter();
        this.exportType = '';
      });
    }



  }


  process_filter(){
    let sets = this.filters;
    let report_type = this.form.controls.report_type.value;
    
    console.log(sets);

    if(report_type == 'company'){
      let employees = sets?.company?._employees;
      if(employees){
        this.totals[2] = employees?.total;
        this.per_pages[2] = employees?.per_page;
        this.page_names[2] = employees?.page_name;
        this.current_pages[2] = employees?.current_page;

        //this.offset = (this.page - 1) * this.per_page;
        /*  offset: this.offset,
        sorting: 'creationtime desc',
        limit: this.per_page,
        per_page: this.per_page,
        ...this.filterModel,
        page:this.page */
        
      }


  


      let tasks = sets?.company?._tasks;
      if(tasks){
        this.totals['company_tasks'] = tasks?.total;
        this.per_pages['company_tasks'] = tasks?.per_page;
        this.page_names['company_tasks'] = tasks?.page_name;
        this.current_pages['company_tasks'] = tasks?.current_page;
      }

      let attendances = sets?.company?._attendances;
      if(attendances){
        this.totals['company_attendances'] = attendances?.total;
        this.per_pages['company_attendances'] = attendances?.per_page;
        this.page_names['company_attendances'] = attendances?.page_name;
        this.current_pages['company_attendances'] = attendances?.current_page;
      }


    }

  }

  exportReport(type = ''){
    this.exportType = type;
    this.filter();
  }


  ReportTypeChanged(report_type){
      this.form.controls['emp_id'].value = null ;
      this.form.controls['company_id'].value = null ;
      this.form.controls['job_id'].value = null ;
      this.form.controls['course_id'].value = null ;
  }


  show(card = null){
    let report_type = this.form.controls['report_type'].value;
    let emp_id = this.form.controls['emp_id'].value;


    switch(card){
      case('company_select'):

        if(report_type == 'company' ){
          return true;
        }

      break;

      case('employee_select'):

        if(report_type == 'employee' || report_type == 'company' || report_type == 'course'){
          return true;
        }
      
      break;


      case('tasks_select'):

        if(report_type == 'company' ){
          return true;
        }
    
      break;


      case('job_select'):

        if(report_type == 'job'){
          return true;
        }
    
      break;

      case('course_select'):

        if(report_type == 'courses'){
          return true;
        }
    
      break;

    }


    return false;
  }



  counter(i: number) {
    return Array(i);
  }

  page;
  pageChanged(event,type=null,page_name = null) {
    let obj = {};

    if(this.page_names[page_name]){
      let da = this.page_names[page_name];
      obj[da] = event;
    }else{
      obj = {page:event};
    }


    this.router.navigate(['.'], { relativeTo: this.route, queryParams:obj});

    if(this.current_pages[page_name]){
      this.current_pages[page_name] = event;
    }else{
      this.page = event;
    }

    let p_name = this.page_names[page_name];
    this.form.addControl(p_name, new FormControl(event));
    this.form.controls[p_name].setValue(event);


    /* console.log(this.current_pages);
    console.log(this.per_pages);
    console.log(this.totals);
    console.log(this.page_names); */

    this.filter(false);
  }
}
