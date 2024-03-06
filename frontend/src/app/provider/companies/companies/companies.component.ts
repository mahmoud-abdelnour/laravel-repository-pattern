import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { FormMode } from 'src/shared/enums/form-mode';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  providers:[DatePipe]
})


export class CompaniesComponent implements OnInit {
  activeApiFunc =  (opts = {})  => this.apiService.get(Endpoints.provider.companies, opts);
  pendingApiFunc =  (opts = {})  => this.apiService.get(Endpoints.provider.pending_companies, opts);
  banApiFunc =  (opts = {})  => this.apiService.get(Endpoints.provider.banned_companies, opts);

  @ViewChild('dialog') dialog;
  @ViewChild('table') table;


  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private translateService:TranslateService,
    private datePipe:DatePipe,
    private themeService:ThemeService

  ) { }

  ngOnInit(): void {
  }


  openDialog(data){
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
      },
      width:'80vw',
      //minHeight:'50vh'
    });
  }

}
