import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  activeApiFunc   =  (opts = {})  => this.apiService.get(Endpoints.provider.candidates, opts);
  pendingApiFunc  =  (opts = {})  => this.apiService.get(Endpoints.provider.pending_candidates, opts);
  banApiFunc      =  (opts = {})  => this.apiService.get(Endpoints.provider.banned_candidates, opts);

  constructor(
    private apiService: ApiService
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
