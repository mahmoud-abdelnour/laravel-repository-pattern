
@include('emails.common.header')

    <tr>
        <td class="content">
            <h3 style="text-align: center;direction:rtl;font-style: normal;"> {{$heading}}  </h3>
            <br>
            @if($type == 'NewEmpRegistration')
                <p>تم تسجيل موظف جديد ب إسم </p>
                <h3><b>{{$data->name}}</b></h3>
            @endif

            @if($type == 'NewCompanyRegistration')
                <p>تم تسجيل شركة جديد ب إسم </p>
                <h3><b>{{$data->name}}</b></h3>
            @endif
        </td>
    </tr>
    
   {{--  <tr>
        <td bgcolor="#ffffff" align="right"
            style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
            <p style="margin: 0;"> رابط إعادة كلمة السر سينتهي خلال 60 دقيقة من الأن.
            </p>
        </td>
    </tr> --}}
            
@include('emails.common.footer')
