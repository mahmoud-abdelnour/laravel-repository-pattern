// export const Routes = [
//     {
//         title:'Dashboard',
//         icon:'dashboard',
//         path:'/provider/dashboard'
//     },
//     {
//         title:'Users',
//         icon:'groups',
//         path:'/provider/users'
//     },
//     {
//         title:'roles',
//         icon:'group_add',
//         path:'/provider/roles'
//     },

//     {
//         title:'Tasks',
//         icon:'task_alt',
//         path:'/company/tasks'
//     },
//     {
//         title:'Messages',
//         icon:'chat',
//         path:'/company/messages'
//     },

//     {
//         title:'JobApplications',
//         icon:'work',
//         path:'/company/job-applications'
//     },


//     {
//         title:'SuggestedCourses',
//         icon:'auto_stories',
//         path:'/individual/courses'
//     },
//     {
//         title:'SuggestedCourses',
//         icon:'work',
//         path:'/individual/job-nominations'
//     }
// ]

export const Routes = {
    provider: [
        {
            title:'Home',
            icon:'home',
            path:'/home'
        },
        {
            title:'Messages',
            icon:'chat',
            path:'/provider/messages',
            permission:'messages'
        },
        {
            title:'Candidates',
            icon:'person_search',
            path:'/provider/candidates',
            permission:'candidates'
        },
        {
            title:'Employees',
            icon:'account_circle_off',
            path:'/provider/employees',
            permission:'employees'
        },
        {
            title:'Companies',
            icon:'apartment',
            path:'/provider/companies',
            permission:'companies'
        },
        {
            //old_delete
            title:'Courses',
            icon:'auto_stories',
            path:'/provider/courses',
            permission:'courses'
        },
        {
            title:'Jobs',
            icon:'work',
            path:'/provider/jobs',
            permission:'jobs'
        },
        {
            //old_delete
            title:'JobRequests',
            icon:'work_history',
            path:'/provider/job-requests',
            permission:'job_requests'
        },
        {
            title:'Tasks',
            icon:'format_list_numbered',
            path:'/provider/tasks',
            permission:'tasks'
        },
        {
            //old_delete
            title:'Resigns',
            icon:'checklist_rtl',
            path:'provider/resigns/list',
            permission:'resigns'
        },
        {
            title:'Attendances',
            icon:'event_available',
            path:'/provider/attendance/list',
            permission:'attendance'
        },
        {
            title:'Reports Dashboard',
            icon:'event_notes',
            path:'/provider/reports',
            permission:'reports'
        },
        {
            title:'Reports',
            icon:'list_alt',
            path:'/provider/reports/custom',
            permission:'reports'
        },
        {
            title:'Users',
            icon:'groups',
            path:'/provider/users',
            permission:'users'
        },
        {
            title:'Roles',
            icon:'group_add',
            path:'/provider/roles',
            permission:'roles'
        },
    ],
    employee: [
        {
            title:'Home',
            icon:'home',
            path:'/home'
        },
        {
            title:'ThePayments',
            icon:'attach_money',
            path:'/individual/payments',
            ability:'can_view_payments'

        },
        {
            title:'Messages',
            icon:'chat',
            path:'/individual/messages',
            ability:'can_send_message'
        },
        {
            title:'SuggestedCourses',
            icon:'auto_stories',
            path:'/individual/courses',
            ability:'can_view_courses'
        },
        {
            title:'JobNominations',
            icon:'work',
            path:'/individual/job-nominations',
            ability:'can_view_nominations'
        },
        {
            title:'Tasks',
            icon:'format_list_numbered',
            path:'/individual/tasks',
            ability:'can_view_tasks'
        },
        {
            title:'Resigns',
            icon:'checklist_rtl',
            path:'individual/resigns/list',
            ability:'can_view_resigns'
        },
        {
            title:'Attendances',
            icon:'event_available',
            path:'/individual/attendance/list',
            ability:'can_view_attendances'
        },
    ],
    company: [
        {
            title:'Home',
            icon:'home',
            path:'/home'
        },
        {
            title:'ThePayments',
            icon:'attach_money',
            path:'/company/payments'
        },
        {
            title:'Tasks',
            icon:'format_list_numbered',
            path:'/company/tasks',
            ability:'can_view_tasks'
        },
        {
            title:'Employees',
            icon:'group',
            path:'/company/employees',
            ability:'can_view_emps'
        },
        {
            title:'Messages',
            icon:'chat',
            path:'/company/messages',
            ability:'can_send_message'
        },

        {
            title:'JobApplications',
            icon:'work',
            path:'/company/job-applications',
            ability:'can_view_job_request'
        },

        {
            title:'Resigns',
            icon:'checklist_rtl',
            path:'/company/resigns/list',
            ability:'can_view_resigns'
        },

        {
            title:'Attendances',
            icon:'event_available',
            path:'/company/attendance/list',
            ability:'can_view_attendances'
        },

        {
            title:'Reports',
            icon:'list_alt',
            path:'/company/reports',
            ability:'can_view_attendances'
        },

    ]
}