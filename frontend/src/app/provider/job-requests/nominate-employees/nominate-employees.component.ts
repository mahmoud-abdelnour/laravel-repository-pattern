import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';

@Component({
  selector: 'app-nominate-employees',
  templateUrl: './nominate-employees.component.html',
  styleUrls: ['./nominate-employees.component.scss']
})
export class NominateEmployeesComponent implements OnInit {
  @Input('ref') ref;
  @Input('data') data;
  form:FormGroup;

  constructor(
    private apiService:ApiService
  ) { }

  activeItems = {};
  ngOnInit(): void {
    this.form = new FormGroup({
      emp_id: new FormControl(this.data.candidates.map(e => {
        this.activeItems[e.id] = e;
        this.itemsLength += 1;
        return e.id
      }), Validators.required)
    })
    this.employees = this.data.candidates;
  }

  

  employees;
  subscription:Subscription;
  OnSearch(ev) {
    if(this.subscription) this.subscription.unsubscribe();

    this.subscription = this.apiService.post(Endpoints.provider.search_nominants, {job_request_id:this.data.id, name:ev.target.value, limit:false}).subscribe(r => {
      this.employees = r.data;
    });
  }

  displayFn(employee): string {
    return employee?.name_ar ||  '';
  }

  optionSelected(value) {
    if(this.activeItems[value.id]) return;
    this.itemsLength += 1;
    this.activeItems[value.id] = value;
  }

  itemsLength = 0;
  deleteItem(val) {
    if(this.itemsLength > 1){
      delete this.activeItems[val.id];
      this.itemsLength -= 1;
    }
  }



  isSaving;
  save() {
    let keys = Object.keys(this.activeItems);
    this.apiService.put(Endpoints.provider.jobRequests + '/' + this.data.id + '/nominate', {emp_id:keys}).subscribe(r => {
      console.log(r);
      this.ref.close(true);
    })
  }
}
