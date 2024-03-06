import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { CustomComponent } from './custom/custom.component';

const routes: Routes = [
  {
    path:'',
    component: ReportsComponent
  },
  {
    path:'custom',
    component: CustomComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
