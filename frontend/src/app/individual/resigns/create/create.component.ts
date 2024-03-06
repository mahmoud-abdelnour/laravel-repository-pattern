import { Component, OnInit ,Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import * as locale from '@angular/common/locales/ar-SA';
import { TranslateService } from '@ngx-translate/core';
import { HttpResponse } from '@angular/common/http';
import { ThemeService } from 'src/shared/services/theme.service';
import { FormMode } from 'src/shared/enums/form-mode';
import { UserService } from 'src/shared/services/user.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input('data') data;
  @Input('mode') mode;
  @Input('ref') ref;
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

  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      notes: new FormControl(null),
    });

   /*  console.log('qqqqqq');
    console.log(this.userService?.userData?.entity);
    console.log('dddddd'); */

  }


  save() {
    if(this.form.invalid) return;

    console.log(this.form.value);

    this.isSaving = true;
    let formData = new FormData();
    let value = {...this.form.value};

    

    
    formData.append('notes', value.notes);

    this.apiService.post(Endpoints.employee.resigns, formData)
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe( (response:any) => {
      console.log(response);
      //let {status} = response;
      //let {errors} = response;
      this.themeService.openSnackBar(this.translateSerivce.instant('SavedSuccessfully'), null);
      this.ref.close(true);
      if(response['errors']){
      
      }else if(response['status']){
        
      }
    });



   /*  this.apiService.uploadFiles(url, formData, 'POST').subscribe( r => {
      if(r instanceof HttpResponse) {
        this.isSaving = false;
        this.themeService.openSnackBar(this.translateSerivce.instant('SavedSuccessfully'), null);
        this.ref.close(true);
      }
    }, e => this.isSaving = false) */

  }


}
