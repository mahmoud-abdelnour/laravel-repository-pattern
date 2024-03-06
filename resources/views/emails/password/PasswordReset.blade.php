
                    
@include('emails.common.header')
                    
                    <tr>
                        <td bgcolor="#ffffff" align="right" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;"><b>السلام عليكم و رحمة الله و بركاته  {{-- {{$name}} --}}</b>
                                <br> لقد تم استقبال طلب إعادة كلمة السر لحسابك الخاص،
                                 
                                </p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="right">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 30px;" bgcolor="#4f5ac2"><a href="{{ $resetLink }}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 30px; border: 1px solid #4f5ac2; display: inline-block;"> إستعادة كلمة السر  </a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="right" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;"> رابط إعادة كلمة السر سينتهي خلال 60 دقيقة من الأن. <br>ي حال عدم احتياجك لإعادة كلمة السر ,الرجاء تجاهل البريد  </p>
                        </td>
                    </tr>


@include('emails.common.footer')
