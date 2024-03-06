import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ThemeService } from 'src/shared/services/theme.service';
import { ApiService } from 'src/shared/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'src/shared/enums/form-mode';
import { finalize } from 'rxjs';
import { Endpoints } from 'src/shared/services/endpoints';




@Component({
  selector: 'app-resign-dialog',
  templateUrl: './resign-dialog.component.html',
  styleUrls: ['./resign-dialog.component.scss']
})
export class ResignDialogComponent implements OnInit {
  @Input('ref') ref;
  @Input('data') data;
  @Input('employees') employees;
  @Input('mode') mode;
  @Input('employeeId') employeeId;

  FormMode = FormMode;

  
  form: FormGroup;
  fileName;
  firstTime = false;
  isSaving;

  constructor(
    private apiService: ApiService,
    private translateSerivce:TranslateService,
    public themeService:ThemeService,
    public userService:UserService
  ) { 
    
  }

  ngOnInit(): void {
    console.log('data');
    console.log(this.data);
    this.form = new FormGroup({
      notes: new FormControl(null),
    });
  }


  

  save() {
      if(this.form.invalid) return;

      this.isSaving = true;
      let formData = new FormData();
      let value = {...this.form.value};
      
      
      formData.append('notes', value.notes);
      formData.append('emp_id', this.employeeId);

      this.apiService.post(Endpoints.company.resigns, formData)
      .pipe(
        finalize(() => this.isSaving = false)
      ).subscribe( (response:any) => {

        console.log(response);

        this.themeService.openSnackBar(this.translateSerivce.instant('SavedSuccessfully'), null);
        this.ref.close(true);

       
      });
  }


}
