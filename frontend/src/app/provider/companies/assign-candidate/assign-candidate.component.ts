import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { finalize, Subscription } from 'rxjs';


@Component({
  selector: 'app-assign-candidate',
  templateUrl: './assign-candidate.component.html',
  styleUrls: ['./assign-candidate.component.scss']
})
export class AssignCandidateComponent implements OnInit {


  @Input('ref') ref;
  @Input('data') data;
  @Input('mode') mode;

  @ViewChild('select2') selectCandidate: NgSelectComponent;
  @ViewChild('select') selectComp: NgSelectComponent;
  @ViewChild('select3') selectJob: NgSelectComponent;

  constructor(
    private apiService:ApiService,
    private themeService:ThemeService
  ){ 

  }
  


  form:FormGroup;
  candidates;
  companies;
  jobs;
  ngOnInit(): void {
    this.form = new FormGroup({
      company_id:new FormControl(null, Validators.required),
      candidate_id:new FormControl(null, [Validators.required]),
      job_id:new FormControl(null, [Validators.required]),
    });

    if(this.data) this.form.patchValue(this.data);

    this.apiService.get(Endpoints.provider.candidates,{'source':'provider'}).subscribe(r => {
      this.candidates = r.data;
    });

    this.apiService.get(Endpoints.provider.companies).subscribe(r => {
      this.companies = r.data;
    });

    this.apiService.get(Endpoints.provider.jobs).subscribe(r => {
      this.jobs = r.data;
    });
    
  }


  OnSearchCandidate(ev) {
    this.selectCandidate.open();
    console.log(ev.term);
    this.getCandidates(ev.term)
  }


  OnSearchCompany(ev){
    this.selectComp.open();
    console.log(ev.term);
    this.getCompanies(ev.term)
  }

  

  OnSearchJob(ev){
    this.selectJob.open();
    console.log(ev.term);
    this.getJobs(ev.term)
  }




  subscription:Subscription;
  getCandidates(search) {
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.apiService.get(Endpoints.provider.candidates, {name_ar:search, limit:false,'source':'provider'}).subscribe(items => {
      this.candidates = items.data
    })
  }

  getCompanies(search) {
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.apiService.get(Endpoints.provider.companies, {name_ar:search, limit:false}).subscribe(items => {
      this.companies = items.data
    })
  }

  getJobs(search) {
    if(this.subscription) this.subscription.unsubscribe();
    this.subscription = this.apiService.get(Endpoints.provider.companies, {job_title:search, limit:false}).subscribe(items => {
      this.jobs = items.data
    })
  }
  


  cancel(){
    
  }



  isSaving = false;
  save() {
    this.isSaving = true;

    console.log(this.form)
    if(this.form.invalid) return;

    this.apiService.post(Endpoints.provider.assign_candidate_to_company,this.form.value) 
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe( r => {
      this.themeService.openSnackBar('SavedSuccessfully', null);
      this.ref.close(true)
    })

  }
}
