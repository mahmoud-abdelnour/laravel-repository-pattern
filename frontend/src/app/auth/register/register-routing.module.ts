import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserType } from 'src/shared/enums/user-type';
import { RegSuccessComponent } from './reg-success/reg-success.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
 
  {
    path:'employee',
    component:RegisterComponent,
    data:{
      userType:UserType.employee
    }
  },
  {
    path:'company',
    component:RegisterComponent,
    data:{
      userType:UserType.company
    }
  },
  {
    path:'registration-success',
    component: RegSuccessComponent
  },
  {
    path:'',
    redirectTo:'employee',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
