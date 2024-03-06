
@include('emails.common.header')

    <tr>
        <td class="content">
            <h3 style="text-align: center;direction:rtl;font-style: normal;"> {{$heading}}  </h3>

            <h4 style="text-align: center;direction:rtl;font-style: normal;"> {{$messagee}}  </h4>
          
            @foreach($courses as $course)
                <li>{{$course->course_title}}</li>
            @endforeach

        </td>
    </tr>
    
   
@include('emails.common.footer')
