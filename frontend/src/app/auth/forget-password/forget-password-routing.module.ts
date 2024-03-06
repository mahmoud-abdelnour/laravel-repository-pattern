import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password.component';

const routes: Routes = [

  {
    path:':token',
    component:ForgetPasswordComponent,
    data:{
      
    }
  },
  {
    path:'',
    component:ForgetPasswordComponent,
    data:{
      formType:'form'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule { }
