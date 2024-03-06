
@include('emails.common.header')

    <tr>
        <td class="content">
            <h3 style="text-align: center;direction:rtl;font-style: normal;"> {{$heading}}  </h3>

            @if($to == 'admins')
                @if(request('response') == 'accepted')
                    <p>قامت شركة {{$company->name_ar}} بقبول ترشيح المرشح:</p>
                @else
                    <p>قامت شركة {{$company->name_ar}} برفض ترشيح المرشح:</p>
                @endif
                <b>{{$data->name_ar}}</b> 
            @endif
         
            @if($to == 'emp')
                <p>تم ترشيحك لوظيفة :</p>
                <b>{{$job->job_title}}</b>
                <p>شركة :</p>
                <b>{{$company->name_ar}} </b>
            @endif
        </td>
    </tr>
    
   
@include('emails.common.footer')
