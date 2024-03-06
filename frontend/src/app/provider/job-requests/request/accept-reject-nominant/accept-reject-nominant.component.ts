import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';

@Component({
  selector: 'app-accept-reject-nominant',
  templateUrl: './accept-reject-nominant.component.html',
  styleUrls: ['./accept-reject-nominant.component.scss']
})
export class AcceptRejectNominantComponent implements OnInit {
  @Input('ref') ref;
  @Input('data') data;
  
  constructor(
    private apiService:ApiService,
  ) { }

  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      company_file: new FormControl(this.data.insurance?.company_file),
      emp_file: new FormControl(this.data.insurance?.emp_file),
    });
    this.form.disable();

    console.log(this.form);
  }

  isSaving = false;
  save() {
    this.isSaving = true;
    this.apiService.put(`${Endpoints.provider.insurances}/${this.data.insurance.id}/approve`)
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe(r => {
      this.ref.close(true)
    })
  }

}
