import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';

const routes: Routes = [
  {
    path:'login',
    loadChildren:() => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path:'login-provider',
    component:LoginAdminComponent
  },
  {
    path:'register',
    loadChildren:() => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path:'forget-password',
    loadChildren:() => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
