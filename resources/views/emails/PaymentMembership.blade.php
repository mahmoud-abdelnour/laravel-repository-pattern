
@include('emails.common.header')

    <tr>
        <td class="content">
            <h3 style="text-align: center;direction:rtl;font-style: normal;"> {{$heading}}  </h3>
            <br>
            
            @if($type == 'NewEmpMembershipPayment')
                <p>تم سداد عضوية مرشح  ب إسم </p>
                <h3><b>{{$data->name}}</b></h3>
            @endif

            @if($type == 'NewCompanyMembershipPayment')
                <p>تم سداد عضوية مرشح  ب إسم </p>
                <h3><b>{{$data->name}}</b></h3>
            @endif
        </td>
    </tr>
    
@include('emails.common.footer')
