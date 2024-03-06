
@include('emails.common.header')

    <tr>
        <td class="content">
            <h3 style="text-align: center;direction:rtl;font-style: normal;"> {{$heading}}  </h3>
            <br>
                <h3>طلب وظائف من قبل شركة <b>{{$data->company->name_ar}}</b></h3>
                
                <p>الوظيفة المطلوبة:</p>
                <b>{{$data->job->job_title}}</b>
           
                <br>
                <p>العدد المطلوب:</p>
                <b>{{$data->count}}</b>
        </td>
    </tr>
    
   
@include('emails.common.footer')
