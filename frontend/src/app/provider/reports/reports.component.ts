import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import { ThemeService } from 'src/shared/services/theme.service';
import { Endpoints } from 'src/shared/services/endpoints';
import type { EChartsOption } from 'echarts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers:[
    DatePipe
  ]
})
export class ReportsComponent implements OnInit {
  employees;
  companies;
  candidates;
  card_data;
  filter_data;
  filters;


  options_1 : EChartsOption;
  options_2 : EChartsOption;
  options_3 : EChartsOption;
  options_4 : EChartsOption;
  options_5 : EChartsOption;
  options_6 : EChartsOption;
  options_7 : EChartsOption;
  options_8 : EChartsOption;
  options_9 : EChartsOption;
  options_10 : EChartsOption;
  options_11 : EChartsOption;
  options_12 : EChartsOption;
  options_13 : EChartsOption;
  options_14 : EChartsOption;
  options_15 : EChartsOption;




  form:FormGroup;
  isSending;
  constructor( 
    private apiService:ApiService,
    private themeService:ThemeService,
    private datePipe:DatePipe

  ){ 

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      company : new FormControl(),
      interval : new FormControl(),
      month : new FormControl(),
      year : new FormControl(),
      date_from : new FormControl(),
      date_to : new FormControl(),
    });



    this.apiService.get(Endpoints.provider.filter_data,{limit:false}).subscribe(r => {
      this.employees = r.employees;
      this.filter_data = r;
    });



    this.apiService.get(Endpoints.provider.reports,{limit:false}).subscribe(r => {
      this.filters = r;
      this.process_filter();
    });


  }


  filter(){

    let value = {...this.form.value};
    value.date_from = this.datePipe.transform(value.date_from , 'yyyy/MM/dd');
    value.date_to = this.datePipe.transform(value.date_to, 'yyyy/MM/dd');
    console.log(value);

    this.apiService.get(Endpoints.provider.reports,value).subscribe(r => {
      this.filters = r;
      this.process_filter();
    });


  }

  process_filter(){
    let sets = this.filters;
  
    this.form.controls['month'].setValue(sets['native_month']); 
    this.form.controls['year'].setValue(sets['year']); 
    this.form.controls['interval'].setValue(sets['interval']); 

    //console.log(this.form.controls['month'].value);

    if(1){

        let options_1_x = [];
        let options_1_y = [];
        Object.keys(sets['job_requests']).forEach(key => {
          // console.log(key); 
          //console.log(sets['job_requests'][key]);  
          options_1_x.push(key);
          options_1_y.push(sets['job_requests'][key]);
        });

        this.options_1 = {
          xAxis: {
            type: 'category',
            data:options_1_x
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data:options_1_y,
              type: 'line'
            }
          ]
        };


        
        let options_2_x = [];
        let options_2_y = [];
        Object.keys(sets['EmpTasks']).forEach(key => {
          options_2_x.push(key);
          options_2_y.push(sets['EmpTasks'][key]);
        });

        this.options_2 = {
          xAxis: {
            type: 'category',
            data:options_2_x
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data:options_2_y,
              type: 'line'
            }
          ]
        };




        let options_3_x = [];
        Object.keys(sets['jobs']).forEach(key => {
          let val = sets['jobs'][key];
          let obj ={ value: val['weight'], name: val['job_title'] };
          options_3_x.push(obj);
        });

        this.options_3 = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'الوظيفة',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data:options_3_x 
            }
          ]
        };




        let options_4_x = [];
        options_4_x.push({ value: sets['active_candidates_count'], name: 'المرشحين المفعلين' });
        options_4_x.push({ value: sets['pending_candidates_count'], name: 'المرشحين قيد التفعيل' });
        options_4_x.push({ value: sets['banned_candidates_count'], name: 'المرشحين المحظورين' });
        this.options_4 = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'عدد المرشحين',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data:options_4_x 
            }
          ]
        };


        let options_10_x = [];
        options_10_x.push({ value: sets['active_employees_count'], name: 'الموظفين المفعلين' });
        //options_10_x.push({ value: sets['pending_employees_count'], name: 'الموظفين قيد التفعيل' });
        options_10_x.push({ value: sets['banned_employees_count'], name: 'الموظفين المحظورين' });
        this.options_10 = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'عدد الموظفين',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data:options_10_x 
            }
          ]
        };

        

        let options_5_x = [];
        Object.keys(sets['job_requests_2']).forEach(key => {
          let val = sets['job_requests_2'][key];
          let obj ={ value: val['count'], name: val['company']['name_ar'] };
          options_5_x.push(obj);
        });

        this.options_5 = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'الشركات الأكثر توظيفا',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data:options_5_x 
            }
          ]
        };



        let options_6_x = [];
        Object.keys(sets['EmpTask_2']).forEach(key => {
          let val = sets['EmpTask_2'][key];
          let obj ={ value: val['count'], name: val['employee']['name_ar'] };
          options_6_x.push(obj);
        });

        this.options_6 = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'الموظفون الأكثر اسنادا للمهام',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data:options_6_x 
            }
          ]
        };


        let options_7_x = [];
        Object.keys(sets['EmpCourse']).forEach(key => {
          let val = sets['EmpCourse'][key];
          let obj ={ value: val['count'], name: val['employee']['name_ar'] };
          options_7_x.push(obj);
        });

        this.options_7 = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'الموظفون الأكثر ترشيحا للدورات',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data:options_7_x 
            }
          ]
        };


        let options_8_x = [];
        let options_8_y = [];
        Object.keys(sets['companies']).forEach(key => {
          //console.log(key); 
          //console.log(sets['companies'][key]); 
          options_8_x.push(key);
          options_8_y.push(sets['companies'][key]);
        });

        this.options_8 = {
          xAxis: {
            type: 'category',
            data:options_8_x
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data:options_8_y,
              type: 'line'
            }
          ]
        };

        let options_9_x = [];
        let options_9_y = [];
        Object.keys(sets['Candidates']).forEach(key => {
          options_9_x.push(key);
          options_9_y.push(sets['Candidates'][key]);
        });

        this.options_9 = {
          xAxis: {
            type: 'category',
            data:options_9_x
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data:options_9_y,
              type: 'line'
            }
          ]
        };

    }

  }

  show(card = null){
  /*   let company = this.form.controls['company'].value;
    let employee = this.form.controls['employee'].value;
 */

    switch(card){
    
      case('employee'):



      break;

    }

  


    return true;

    return false;

  }


}
