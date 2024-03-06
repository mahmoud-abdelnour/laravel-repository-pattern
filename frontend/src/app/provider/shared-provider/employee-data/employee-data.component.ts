import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IColumnType } from 'angular2-smart-table';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss']
})
export class EmployeeDataComponent implements OnInit {
  @Input('data') data;
  @Input('selectedIndex') selectedIndex = 0;
  @Input('title') title = 'CandidateDetails';


  apiFunc = () => this.apiService.get(`${Endpoints.provider.employees}/${this.data.id}/payments`);


  
  constructor(
    public themeService:ThemeService,
    private apiService:ApiService
  ) { }
  form:FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      national_id_file: new FormControl(this.data.national_id_file_url),
      qualification_file: new FormControl(this.data.qualification_file_url),
      national_address_file: new FormControl(this.data.national_address_file_url),
      bank_ipan_file: new FormControl(this.data.bank_ipan_file_url),
      secret_approvement_file: new FormControl(this.data.secret_approvement_file_url),
    });
    this.form.disable();
    
  }

}
