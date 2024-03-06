import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserType } from 'src/shared/enums/user-type';
import { LoginComponent } from './login.component';

const routes: Routes = [

  {
    path:'employee',
    component:LoginComponent,
    data:{
      userType:UserType.employee
    }
  },
  {
    path:'company',
    component:LoginComponent,
    data:{
      userType:UserType.company
    }
  },
  {
    path:'',
    redirectTo: 'employee',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
