import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  activeApiFunc =  (opts = {})  => this.apiService.get(Endpoints.provider.employees, opts);
  banApiFunc =  (opts = {})  => this.apiService.get(Endpoints.provider.banned_employees, opts);

  constructor(
    private apiService:ApiService
  ) { }

  jobs = {};
  allDone = false;
  ngOnInit(): void {
    this.apiService.get(Endpoints.provider.jobs, {limit:false}).subscribe(r => {
      for(let job of r.data) {
        this.jobs[job.id] = job;
        this.allDone = true
      }
    })

  }

}
