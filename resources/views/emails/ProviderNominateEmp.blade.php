
@include('emails.common.header')

    <tr>
        <td class="content">
            <h3 style="text-align: center;direction:rtl;font-style: normal;"> {{$heading}}  </h3>

            <h3><b>{{$data->company->name_ar}}</b></h3>
            
            <p>الوظيفة المطلوبة:</p>
            <b>{{$data->job->job_title}}</b>

            <p>المرشحين</p>
            <ul>
                @foreach($data->candidates as $candidate)
                    <li><p><b>{{$candidate->name_ar}}</b></li>
                @endforeach
            </ul>
             
        </td>
    </tr>
    
   
@include('emails.common.footer')
