import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'home',
        component:HomeComponent,
      },
      // {
      //   path:'dashboard',
      //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
      {
        path:'company',
        loadChildren: () => import('../company/company.module').then(m => m.CompanyModule)
      },
      {
        path:'individual',
        loadChildren: () => import('../individual/individual.module').then(m => m.IndividualModule)
      },
      {
        path:'provider',
        loadChildren: () => import('../provider/provider.module').then(m => m.ProviderModule)
      },
      {
        path:'profile',
        loadChildren:() => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path:'provider-profile',
        component:ProviderProfileComponent
      },
      {
        path:'notifications',
        loadChildren:() => import('./notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path:'settings',
        loadChildren:() => import('./settings/settings.module').then(m => m.SettingsModule)
      },
     /*  {
        path:'pages',
        loadChildren:() => import('./single/single.module').then(m => m.SingleModule)
      }, */
      {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
      }
    ],
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
