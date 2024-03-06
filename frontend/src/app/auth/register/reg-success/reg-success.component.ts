import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserType } from 'src/shared/enums/user-type';

@Component({
  selector: 'app-reg-success',
  templateUrl: './reg-success.component.html',
  styleUrls: ['./reg-success.component.scss']
})
export class RegSuccessComponent implements OnInit {
  constructor(
  private activatedRoute:ActivatedRoute,
  private router:Router
  ) { }
    
  userType;

  counter = 5;
  interval;

  ngOnInit(): void {
    this.userType = this.activatedRoute.snapshot.queryParams['userType'] || UserType.employee;

    this.interval = setInterval(() => {
      if(this.counter > 0) this.counter -= 1;
      if(this.counter == 0) this.navToLogin()
    }, 1000)
  }

  navToLogin() {
    clearInterval(this.interval);
    this.router.navigate(['/', 'auth', 'login', this.userType])
  }

}
