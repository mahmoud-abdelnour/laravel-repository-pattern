import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { finalize, Subscription } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-suggest-courses',
  templateUrl: './suggest-courses.component.html',
  styleUrls: ['./suggest-courses.component.scss']
})
export class SuggestCoursesComponent implements OnInit {
  @Input('ref') ref;
  @Input('data') data;

  constructor(
    private apiService:ApiService,
    private themeService:ThemeService
  ) { }
  
  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      course_id:new FormControl(null, Validators.required),
    });
    if(this.data) this.form.patchValue(this.data);
  }


  @ViewChild('select') selectComp: NgSelectComponent;

  courses;
  OnSearch(ev) {
    this.selectComp.open();
    this.getCourses(ev.term)
  }

  subscription:Subscription;
  getCourses(search) {
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.apiService.get(Endpoints.provider.courses, {course_title:search, limit:false}).subscribe(items => {
      this.courses = items.data
    })
  }
  


  isSaving = false;
  save() {
    console.log(this.form)
    if(this.form.invalid) return;
    this.apiService.put(Endpoints.provider.employees + '/' + this.data.id +'/suggestCourses', this.form.value)
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe( r => {
      this.themeService.openSnackBar('SavedSuccessfully', null);
      this.ref.close(true)
    })
  }

}
