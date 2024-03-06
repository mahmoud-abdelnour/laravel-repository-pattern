
@include('emails.common.header')

    <tr>
        <td class="content">
            <h3 style="text-align: center;direction:rtl;font-style: normal;"> {{$heading}}  </h3>

            <h4 style="text-align: center;direction:rtl;font-style: normal;"> {{$messagee}}  </h4>

            {{-- {{dd($data['task']->toarray())}} --}}


            <b>عنوان المهمة: </b>
            <p>{{$data['task']->task->task_title}}</p>

            <b>وصف المهمة: </b>
            <p>{{$data['task']->task->task_description}}</p>

            <b>مدة المهمة: </b>
            <p>{{$data['task']->task->task_period}}</p>

            <b> تاريخ الاسناد: </b>
            <p>{{$data['task']->task->created_at}}</p> 

            <b> تاريخ الاستحقاق: </b>
            <p>{{$data['task']->due_date}}</p>


        </td>
    </tr>
    
   
@include('emails.common.footer')
