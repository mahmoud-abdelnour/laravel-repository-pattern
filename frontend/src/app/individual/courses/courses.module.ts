import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/shared/shared.module';
import { ActionsComponent } from './list/actions/actions.component';
import { CourseComponent } from './course/course.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxValidateCoreModule } from '@ngx-validate/core';


@NgModule({
  declarations: [
    ListComponent,
    ActionsComponent,
    CourseComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    MatCheckboxModule,
    NgxValidateCoreModule.forRoot({
      blueprints: {
        checkError:'يجب الموافقة على العقد'
      },
    })
  ]
})
export class CoursesModule { }
