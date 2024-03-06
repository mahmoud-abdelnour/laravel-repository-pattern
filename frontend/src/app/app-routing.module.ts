import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/guards/auth.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path:'pages',
    loadChildren:() => import('./pages/single/single.module').then(m => m.SingleModule)
  },

  {
    path:'',
    loadChildren:() => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate:[
      AuthGuard
    ]
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
