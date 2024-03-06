import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  {
    path:'list',
    component: ListComponent
  },
  {
    path:':requestId',
    component: RequestComponent
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
export class JobRequestsRoutingModule { }
