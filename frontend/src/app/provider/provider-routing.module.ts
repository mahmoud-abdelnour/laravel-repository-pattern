import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilitiesGuard } from 'src/shared/guards/abilities.guard';
import { PermissionsGuard } from 'src/shared/guards/permissions.guard';

const routes: Routes = [
  {
    path:'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'employees',
    loadChildren: () => import('./employees/employees.module').then( m => m.EmployeesModule),
    canActivate:[ PermissionsGuard ], 
    data:{
      permission:'employees'
    }
  },
  {
    path:'companies',
    loadChildren: () => import('./companies/companies.module').then( m => m.CompaniesModule),
    canActivate:[ PermissionsGuard ], 
    data:{
      permission:'companies'
    }
  },
  {
    path:'candidates',
    loadChildren: () => import('./candidates/candidates.module').then( m => m.CandidatesModule),
    canActivate:[ PermissionsGuard ], 
    data:{
      permission:'candidates'
    }
  },
  {
    path:'jobs',
    loadChildren: () => import('./jobs/jobs.module').then( m => m.JobsModule),
    canActivate:[ PermissionsGuard ], 
    data:{
      permission:'jobs'
    }
  },
  {
    path:'job-requests',
    loadChildren: () => import('./job-requests/job-requests.module').then( m => m.JobRequestsModule),
    canActivate:[ PermissionsGuard ], 
    data:{
      permission:'job_requests'
    }
  },
  {
    path:'courses',
    loadChildren: () => import('./courses/courses.module').then( m => m.CoursesModule),
    canActivate:[ PermissionsGuard ], 
    data:{
      permission:'courses'
    }
  },
  {
    path:'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksModule),
    canActivate:[ PermissionsGuard ], 
    data:{
      permission:'tasks'
    }
  },
  {
    path:'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule),
    canActivate:[ PermissionsGuard ], 
    data:{
      permission:'users'
    }
  },
  {
    path:'roles',
    loadChildren: () => import('./roles/roles.module').then( m => m.RolesModule),
    canActivate:[ PermissionsGuard ], 
    data:{
      permission:'roles'
    }
  },
  {
    path:'messages',
    loadChildren: () => import('../pages/messages/messages.module').then(m => m.MessagesModule),
    canActivate:[ PermissionsGuard ],
    data:{
      permission:'messages'
    }
  },
  {
    path:'resigns',
    loadChildren: () => import('./resigns/resigns.module').then(m => m.ResignsModule),
 /*    canActivate:[ PermissionsGuard ],
    data:{
      permission:'resigns'
    } */
  },

  {
    path:'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendanceModule),
   /*  canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_resigns'
    } */
  },

  {
    path:'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsModule),
   /*  canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_resigns'
    } */
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
