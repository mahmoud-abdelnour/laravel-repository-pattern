import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ActionComponent } from '../action/action.component';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { ThemeService } from 'src/shared/services/theme.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    DatePipe
  ]
})
export class ListComponent implements OnInit {
  @ViewChild('dialog') dialog;
  @ViewChild('table') table;
  emp_name;
  parent;
  rowData;
  report_type =  this.activatedRoute.snapshot.data['type'];

  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.provider.attendance,{emp_id:this.id,...opts},);
  
  //[routerLink]="['/company/job-applications', rowData.id, 'applicants']"

  settings = {
    columns: {
      employee_name:{
        title: ' الموظف ',
        valuePrepareFunction: (v, r) => r.employee.name_ar ,
        renderComponent: ActionComponent,
        type: IColumnType.Custom,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => {
          instance.parent = this;
        }
      },
      day_counts:{
        title: ' عدد الايام ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => r.employee?.attendances?.length ,
      },
      company_name:{
        title: ' الشركة ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => r.employee.company.name_ar ,
      },
      date:{
        title: ' دخول ',
        type: 'string',
        filter: false,
        hide: this.report_type == 'detailed' ? false : true,
        valuePrepareFunction: (v, r) =>{
         // this.emp_name = r.employee.name_ar;
          return  this.datePipe.transform(r.check_in,'yyyy/MM/dd h:mm a') ;
        },
      },
      check_out:{
        title: ' خروج ',
        type: 'string',
        hide: this.report_type == 'detailed' ? false : true,
        filter: false,
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.check_out,'yyyy/MM/dd h:mm a') ,
      },

      /*actions: {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => {
          console.log(instance);
          instance.parent = this;
        }
      } */
    },
  };
  

  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private translateService:TranslateService,
    private themeService:ThemeService,
    private datePipe:DatePipe,
    private activatedRoute:ActivatedRoute

  ) { }


  id;
  ngOnInit(): void {

    //this.report_type = this.activatedRoute.snapshot.data['type'];

    this.id=this.activatedRoute.snapshot.params["id"];

    if(this.id){
      this.apiService.get(Endpoints.provider.employees+'/'+this.id).subscribe(r => {
        this.emp_name = r.employee.name_ar;
      });

      delete this.settings.columns["employee_name"];
      delete this.settings.columns["day_counts"];
    }

 

    

    this.activatedRoute.data.subscribe(data => {
      
    });

  }

  

  openDialog(data = null) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
