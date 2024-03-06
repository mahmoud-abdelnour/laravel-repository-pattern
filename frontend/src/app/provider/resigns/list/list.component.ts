import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { ThemeService } from 'src/shared/services/theme.service';
import{ActionsComponent} from '../actions/actions.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

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

  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.provider.resigns, opts);

  settings = {
    columns: {
      employee_name:{
        title: ' الموظف ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => r.employee.name_ar ,
      },
      job_title:{
        title: ' الوظيفة ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => r.employee.job.job_title ,
      },
      company:{
        title: ' الشركة ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => r.company.name_ar ,
      },
      status:{
        title: 'الحالة',
        filter: false,
        type: IColumnType.Custom,
        renderComponent: TableStatusComponent,
        onComponentInitFunction: (instance) => {
          instance.statusEnum = this.themeService.settings.RESIGN_STATUS.enum;
        },
      },
      date:{
        title: 'تاريخ الطلب',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.created_at, 'yyyy/MM/dd') ,
      },

      actions: {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => {
          console.log(instance);
          instance.parent = this;
        }
      }

    },
  };
  
  dialogRef;
  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private translateService:TranslateService,
    public themeService:ThemeService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      notes: new FormControl(null),
    });
  }

  form: FormGroup;
  fileName;
  firstTime = false;
  isSaving;

  openDialog(data = null,rowData) {
    console.log(rowData);
    this.dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
        rowData,
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  save(id){

    this.isSaving = true;
    let formData = new FormData();
    let value = {...this.form.value};
    
    formData.append('emp_id',id);

    this.apiService.post(Endpoints.provider.approve_resign+'/'+id, formData)
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe( (response:any) => {

      console.log(response);

      this.themeService.openSnackBar(this.translateService.instant('SavedSuccessfully'), null);
      this.dialogRef.close(true);
      this.table.reloadTable();
     
    }); 
  }
}
