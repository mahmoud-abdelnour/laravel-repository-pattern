import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilitiesGuard } from 'src/shared/guards/abilities.guard';

const routes: Routes = [
  {
    path:'messages',
    loadChildren: () => import('../pages/messages/messages.module').then(m => m.MessagesModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_send_message'
    }
  },
  {
    path:'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_courses'
    }
  },
  {
    path:'job-nominations',
    loadChildren: () => import('./job-nominations/job-nominations.module').then(m => m.JobNominationsModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_nominations'
    }
  },
  {
    path:'payments',
    loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_payments'
    }
  },
  {
    path:'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksModule),
    canActivate:[ AbilitiesGuard ],
    data:{
      ability:'can_view_tasks'
    }
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
export class IndividualRoutingModule { }
