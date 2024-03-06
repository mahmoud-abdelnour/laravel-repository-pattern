
<html  dir="rtl">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <style>

       /*  @font-face {
            font-family: DINNextLTArabic;
            src: url('{{url('fonts/DINNextLTArabic-Medium.ttf')}}');
        }
        body {
            background: #FFF;
            font-family: DINNextLTArabic;
        } */
        table {
            width:100%;
        }


        table th{
            font-size: 14px;
            font-weight: bold;
            background-color: rgb(78, 78, 78);
        }
        table td{
            font-size: 11px;
            padding-bottom:10px;
        }
        h3{
            font-size: 18px;
        }
    </style>
</head>

<body dir="rtl">

    {{-- <div dir="ltr">{{dd($filters['company'])}}</div> --}}

    @if($filters->companies)
        <h3 class="mt-5" >الشركات</h3>
        <table  cellspacing="2" cellpadding="3" border="1">
            <tr>
                <th>#</th>
                <th>الشركة</th>
                <th>تاريخ التسجيل</th>
                <th>عدد الموظفين</th>
                <th>عدد المهام</th>
                <th>عدد طلبات الوظائف</th>
            </tr>
            @php $i=0; @endphp 
            @foreach($filters->companies as $company)
                <tr  >
                    <td>{{++$i}}</td>
                    <td>{{$company->name_ar}}</td>
                    <td>{{\Carbon\Carbon::parse($company->created_at)->format('Y-m-d')}}</td>
                    <td>{{count($company->employees)}}</td>
                    <td>{{count($company->tasks)}}</td>
                    <td>{{count($company->emp_requests)}}</td>
                </tr>
            @endforeach
        </table>     
    @endif


    @if($filters->company)
            <h3 class="mt-5" >{{$filters->company->name_ar}}</h3>
            <h4 class="mt-5" >الموظفين</h4>
            <table cellspacing="2" cellpadding="3" border="1">
                <tr>
                    <th>#</th>
                    <th>الموظف</th>
                    <th>تاريخ التسجيل</th>
                    <th>الوظيفة</th>
                    <th>عدد المهام</th>
                </tr>
                @php $i=0; @endphp 
                @foreach($filters->company->employees as $employee)
                    <tr >
                        <td>{{++$i}}</td>
                        <td>{{$employee->name_ar}}</td>
                        <td>{{\Carbon\Carbon::parse($employee->created_at)->format('Y-m-d')}}</td>
                        <td>{{$employee->job->job_title}}</td>
                        <td>{{count($employee->tasks)}}</td>
                    </tr>
                @endforeach
            </table> 
            
            {{-- <div style="direction:ltr">
                {{dd($filters->company->tasks)}}
            </div> --}}

            @if($filters->company->_attendances)
                <div>
                    <h4 class="mt-5" >الحضور والانصراف</h4>
                    <table cellspacing="2" cellpadding="3" border="1"> 
                        <tr>
                            <th>#</th>
                            <th>الاسم</th>
                            <th>دخول</th>
                            <th>خروج</th>
                        </tr>
                        @foreach($filters->company->_attendances as $attendance)
                            <tr >
                                <td>{{++$ii}}</td>
                                <td>{{$attendance->employee->name_ar}}</td>
                                <td>{{$attendance->check_in}} </td>
                                <td>{{$attendance->check_out}}</td>
                            </tr>
                        @endforeach
                    </table> 
                </div>
            @endif


            @if($filters->company->tasks)
                <div >
                    <h4 class="mt-5" >المهام</h4>
                    <table  cellspacing="2" cellpadding="3" border="1"> 
                        <tr>
                            <th>#</th>
                            <th>المهمة</th>
                            <th>مدة المهمة </th>
                            <th>عدد مرات الاسناد</th>
                        </tr>
                        @php $i=0; @endphp 
                        @foreach($filters->company->tasks as $task)
                            <tr >
                                <td>{{++$i}}</td>
                                <td>{{$task->task->task_title}}</td>
                                <td>{{$task->task->task_period}} ساعة</td>
                                <td>{{$task->counts}}</td>
                            </tr>
                        @endforeach

                    </table> 
                </div>
            @endif


            @if($filters->company->emp_requests)
                <div >
                    <h4 class="mt-5" >طلبات التوظيف</h4>
                    <table  cellspacing="2" cellpadding="3" border="1"> 
                        <tr>
                            <th>#</th>
                            <th>الوظيفة</th>
                            <th>العدد المطلوب</th>
                            <th>تاريخ الطلب</th>
                        </tr>
                        @php $i=0; @endphp 
                        @foreach($filters->company->emp_requests as $request)
                            <tr >
                                <td>{{++$i}}</td>
                                <td>{{$request->job->job_title}}</td>
                                <td>{{$request->count}}</td>
                                <td>{{\Carbon\Carbon::parse($request->created_at)->format('Y-m-d')}}</td>
                            </tr>
                        @endforeach

                    </table> 
                </div>
            @endif


            @if($filters->company->emp_requests)
                <div >
                    <h4 class="mt-5" >المدفوعات</h4>
                    <table  cellspacing="2" cellpadding="3" border="1"> 
                        <tr>
                            <th>#</th>
                            <th> المبلغ</th>
                            <th width="120"> الحالة</th>
                            <th>التاريخ </th>
                        </tr>
                        @php $i=0; @endphp 
                        @foreach($filters->company->subscriptions as $payment)
                            <tr >
                                <td>{{++$i}}</td>
                                <td>{{$payment->payment_amount}}</td>
                                <td>
                                    {{array_flip($enum['COMPANY_SUBSCRIPTION_APPROVE'])[$payment->is_approved]}}
                                </td>
                                <td>{{\Carbon\Carbon::parse($payment->created_at)->format('Y-m-d')}}</td>
                            </tr>
                        @endforeach

                    </table> 
                </div> 
            @endif
    @endif



    <!-- employees -->
    @if($filters->employees)
        <h3 class="mt-5" >الموظفين</h3>
        <table   cellspacing="2" cellpadding="3" border="1">
            <tr>
                <th>#</th>
                <th>الموظف</th>
                <th>تاريخ التسجيل</th>
                <th>عدد المهام</th>
                <th>عدد الدورات</th>
                <th>عدد الترشيحات</th>
                <th>عدد طلبات انهاء التعاقد</th>
            </tr>
            @php $i=0; @endphp 
            @foreach($filters->employees as $employee)
                <tr  >
                    <td>{{++$i}}</td>
                    <td>{{$employee->name_ar}}</td>
                    <td>{{\Carbon\Carbon::parse($employee->created_at)->format('Y-m-d')}}</td>
                    <td>{{count($employee->tasks)}}</td>
                    <td>{{count($employee->courses)}}</td>
                    <td>{{count($employee->nominations)}}</td>
                    <td>{{count($employee->resigns)}}</td>
                </tr>
            @endforeach
        </table>     
    @endif


    @if($filters->employee)
            <h3 class="mt-5" >{{$filters->employee->name_ar}}</h3>
            <div  *ngIf="filters?.employee.tasks"   >
                <h4 class="mt-5" >المهام</h4>
                <table cellspacing="2" cellpadding="3" border="1">
                    <tr>
                        <th>#</th>
                        <th>المهمة</th>
                        <th>تاريخ الاسناد</th>
                    </tr>
                    @php $i=0; @endphp 
                    @foreach($filters->employee->tasks as $task)
                        <tr >
                            <td>{{++$i}}</td>
                            <td>{{$task->task->task_title}}</td>
                            <td>{{\Carbon\Carbon::parse($task->created_at)->format('Y-m-d')}}</td>
                        </tr>
                    @endforeach

                </table> 
            </div>


            @php $i=0; @endphp 
            @if($filters->employee->suggestedCourses)
                <div>
                    <h4 class="mt-5" >الدورات</h4>
                    <table cellspacing="2" cellpadding="3" border="1">
                        <tr>
                            <th>#</th>
                            <th>عنوان الدورة</th>
                            <th>تاريخ الترشيح</th>
                        </tr>
                        @foreach($filters->employee->suggestedCourses as $course)
                            <tr  >
                                <td>{{++$i}}</td>
                                <td>{{$course->course->course_title}}</td>
                                <td>{{\Carbon\Carbon::parse($course->created_at)->format('Y-m-d')}}</td>
                            </tr>
                        @endforeach

                    </table> 
                </div>
            @endif


            @php $i=0; @endphp 
            @if($filters->employee->nominations)
                <div    >
                    <h4 class="mt-5" >الترشيحات</h4>
                    <table cellspacing="2" cellpadding="3" border="1">
                        <tr>
                            <th>#</th>
                            <th>الوظيفة</th>
                            <th>الشركة</th>
                            <th>تاريخ الترشيح</th>
                        </tr>
                        @foreach($filters->employee->nominations as $nomination)
                            <tr >
                                <td>{{++$i}}</td>
                                <td>{{$nomination->job->job_title}}</td>
                                <td>{{$nomination->company->name_ar}}</td>
                                <td>{{\Carbon\Carbon::parse($nomination->created_at)->format('Y-m-d')}}</td>
                            </tr>
                        @endforeach

                    </table> 
                </div>
            @endif



            @php $i=0; @endphp 
            @if($filters->employee->subscriptions)
                <div  cellspacing="2" cellpadding="3" border="1">
                    <h4 class="mt-5" >المدفوعات</h4>
                    <table  cellspacing="2" cellpadding="3" border="1"> 
                        <tr>
                            <th>#</th>
                            <th> المبلغ</th>
                            <th> النوع</th>
                            <th width="120"> الحالة</th>
                            <th>التاريخ </th>
                        </tr>

                        @foreach($filters->employee->subscriptions as $payment)
                            <tr >
                                <td>{{++$i}}</td>
                                <td>{{$payment->payment_amount}}</td>
                                <td>
                                    @if($payment->subscription_type == 'membership')
                                        <span>اشتراك عضوية</span>
                                    @elseif($payment->subscription_type == 'courses')
                                        <span>دورات تدريبية</span>
                                    @endif
                                </td>
                                <td>
                                    <div style="width:100px">
                                        {{array_flip($enum['COMPANY_SUBSCRIPTION_APPROVE'])[$payment->is_approved]}}
                                    </div>
                                </td>
                                <td>{{\Carbon\Carbon::parse($payment->created_at)->format('Y-m-d')}}</td>
                            </tr>
                        @endforeach


                    </table> 
                </div>
            @endif

            @php $i=0; @endphp 
            @if($filters->employee->attendances) 
                <div >
                    <h4 class="mt-5" >الحضور والانصراف</h4>
                    <table  cellspacing="2" cellpadding="3" border="1">
                        <tr>
                            <th>#</th>
                            <th>دخول</th>
                            <th>خروج</th>
                        </tr>
                        @foreach($filters->employee->attendances as $attendance)
                            <tr >
                                <td>{{++$i}}</td>
                                <td>{{$attendance->check_in}}</td>
                                <td>{{$attendance->check_out}}</td>
                            </tr>
                        @endforeach

                    </table> 
                </div> 
            @endif
    @endif



        <!-- jobs -->
    @if($filters->jobs) 
        <ng-container   >
            <h3 class="mt-5">الوظائف</h3>
            <table cellspacing="2" cellpadding="3" border="1">
                <tr>
                    <th>#</th>
                    <th>الوظيفة</th>
                    <th>أُضيف بتاريخ</th>
                    <th>عدد المهام</th>
                    <th>عدد الموظفين</th>
                    <th>عدد الترشيحات</th>
                </tr>
                @php $i=0; @endphp 
                @foreach($filters->jobs as $job)
                    <tr>
                        <td>{{++$i}}</td>
                        <td>{{$job->job_title}}</td>
                        <td>{{\Carbon\Carbon::parse($job->created_at)->format('Y-m-d')}}</td>
                        <td>{{count($job->assigned_tasks)}}</td>
                        <td>{{count($job->employees)}}</td>
                        <td>{{count($job->nominations)}}</td>
                    </tr>
                @endforeach
            </table>     
        </ng-container>
    @endif


    @if($filters->job) 
        <h3 class="mt-5" >{{$filters->job->job_title}}</h3>
        <div >
            <h4 class="mt-5" >المهام</h4>
            <table  cellspacing="2" cellpadding="3" border="1">
                <tr>
                    <th>#</th>
                    <th>المهمة</th>
                    <th>الشركة</th>
                    <th>الموظف</th>
                    <th>تاريخ الاسناد</th>
                </tr>

                @php $i=0; @endphp 
                @foreach($filters->job->assigned_tasks as $task)
                    <tr >
                        <td>{{++$i}}</td>
                        <td>{{$task->task->task_title}}</td>
                        <td>{{$task->company->name_ar}}</td>
                        <td>{{$task->employee->name_ar}}</td>
                        <td>{{\Carbon\Carbon::parse($task->created_at)->format('Y-m-d')}}</td>
                    </tr>
                @endforeach

            </table> 
        </div>


        @if($filters->job->employees) 
            <div>
                <h4 class="mt-5" >الموظفين</h4>
                <table  cellspacing="2" cellpadding="3" border="1">
                    <tr>
                        <th>#</th>
                        <th>الموظف</th>
                        <th>تاريخ الاسناد</th>
                    </tr>
                    @php $i=0; @endphp 
                    @foreach($filters->job->employees as $emp)
                        <tr  >
                            <td>{{++$i}}</td>
                            <td>{{$emp->name_ar}}</td>
                            <td>{{\Carbon\Carbon::parse($emp->created_at)->format('Y-m-d')}}</td>
                        </tr>
                    @endforeach


                </table> 
            </div>
        @endif


        @if($filters->job->nominations) 
            <div >
                <h4 class="mt-5" >طلبات الوظائف</h4>
                <table  cellspacing="2" cellpadding="3" border="1">
                    <tr>
                        <th>#</th>
                        <th>الشركة</th>
                        <th>العدد</th>
                        <th>تاريخ الطلب</th>
                    </tr>
                    @php $i=0; @endphp 
                    @foreach($filters->job->nominations as $nomination)
                        <tr >
                            <td>{{++$i}}</td>
                            <td>{{$nomination->company->name_ar}}</td>
                            <td>{{$nomination->count}}</td>
                            <td>{{\Carbon\Carbon::parse($nomination->created_at)->format('Y-m-d')}}</td>
                        </tr>
                    @endforeach
                </table> 
            </div> 
        @endif

    @endif

    


</body>
</html>