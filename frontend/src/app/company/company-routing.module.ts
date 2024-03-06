import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilitiesGuard } from 'src/shared/guards/abilities.guard';

const routes: Routes = [
  {
    path:'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_tasks'
    }
  },
  {
    path:'messages',
    loadChildren: () => import('../pages/messages/messages.module').then(m => m.MessagesModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_send_message'
    }
  },
  {
    path:'job-applications',
    loadChildren: () => import('./job-applications/job-applications.module').then( m => m.JobApplicationsModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_job_request'
    }
  },
  {
    path:'employees',
    loadChildren: () => import('./employees/employees.module').then( m => m.EmployeesModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_emps'
    }
  },
  {
    path:'payments',
    loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsModule),
  },

  {
    path:'resigns',
    loadChildren: () => import('./resigns/resigns.module').then( m => m.ResignsModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_resigns'
    }
  },
  {
    path:'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendanceModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_attendances'
    }
  },

  {
    path:'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_reports'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }