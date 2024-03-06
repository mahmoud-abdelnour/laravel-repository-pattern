import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatesComponent } from './candidates.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path:'list',
    component: CandidatesComponent
  },

  {
    path:'create',
    component: CreateComponent
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
export class CandidatesRoutingModule { }
