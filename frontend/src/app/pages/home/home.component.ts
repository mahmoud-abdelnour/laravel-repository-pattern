import { Component, OnInit,ViewChild } from '@angular/core';
import { UserType } from 'src/shared/enums/user-type';
import { UserService } from 'src/shared/services/user.service';
import { ApiService } from 'src/shared/services/api.service';
import { finalize } from 'rxjs';
import { Endpoints } from 'src/shared/services/endpoints';
import { NgxEchartsModule } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  UserType = UserType;
  card_data;
  @ViewChild('dialog') dialog;
  form:FormGroup;

  //options: EChartsOption;
  options: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
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
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
  mergeOptions: EChartsOption;


  remote_work_reports;
  last_TeleworkReport;
  diffInDays;
  constructor(
    public userService:UserService,
    private apiService:ApiService,
    private matDialog:MatDialog,
    private themeService:ThemeService


  ) { }

  settings;
  ngOnInit(): void {//send_telework_report
    this.settings = this.themeService.globalSettings;
    console.log(this.settings);


    this.apiService.get(Endpoints.provider_cards)
    .pipe(
      finalize(() =>{

      })
    )
    .subscribe( (response:any) => {
        this.card_data = response; 
    });




    this.apiService.get(Endpoints.provider.prepare_remote_reports)
    .pipe(
      finalize(() =>{

      })
    )
    .subscribe( (response:any) => {
       this.remote_work_reports = response['data'];
       this.diffInDays = response['diffInDays'];
       this.last_TeleworkReport = response['last_TeleworkReport'];
    });




    this.form = new FormGroup({
      remote_work_reports: new FormControl(null, Validators.required),
    });
   
  



    /* 
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['bar', 'bar2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: idx => idx * 10,
        },
        {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: idx => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5,
    }; */



  }


  
  openDialog(data = null) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




  isSaving;
  SendReport(){
    let data = this.remote_work_reports;
    this.apiService.post(Endpoints.sendReport, {data:data})
    .pipe(
      finalize(( ) => this.isSaving = false)
    )
    .subscribe( (response:any) => {
      this.themeService.openSnackBar('SavedSuccessfully', null);
    });

  }


  RandomDataset() {
    this.mergeOptions = {
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', ...this.getRandomValues()],
          ['Milk Tea', ...this.getRandomValues()],
          ['Cheese Cocoa', ...this.getRandomValues()],
          ['Walnut Brownie', ...this.getRandomValues()],
        ],
      },
    };
  }

  private getRandomValues() {
    const res: number[] = [];
    for (let i = 0; i < 3; i++) {
      res.push(Math.random() * 100);
    }
    return res;
  }

}
