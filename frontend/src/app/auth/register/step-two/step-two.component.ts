import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserType } from 'src/shared/enums/user-type';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  @Input('tabs') tabs;
  @Input('jobs') jobs;
  @Input('banks') banks;
  @Input('user_type') user_type;
  @Input('form') form:FormGroup;
  UserType = UserType;



  constructor(
    public themeService:ThemeService
  ) { }

  ngOnInit(): void {
  }

  save() {
    if(this.form.valid) this.tabs.activeTab = 3;
  }
}