import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantsListComponent } from './applicants-list/applicants-list.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path:'',
    component:ListComponent
  },
  {
    path:':applicationId/applicants',
    component:ApplicantsListComponent
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobApplicationsRoutingModule { }
