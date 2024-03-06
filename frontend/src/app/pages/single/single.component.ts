import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/shared/services/user.service';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { Subscription, finalize } from 'rxjs';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  constructor(
    public activatedRoute:ActivatedRoute,
    private apiService:ApiService,

  ) { }
  settings;
  isSaving;
  pageContent;
  pageId;
  ngOnInit(): void {
    this.pageId = this.activatedRoute.snapshot.params['pageId'];
    let formType = this.activatedRoute.snapshot.data['pageId'];

    console.log(this.pageId);

    this.apiService.get(Endpoints.provider.settings)
    .pipe(
      finalize(( ) => this.isSaving = false)
    ).subscribe(r => {
      this.settings = r.settings;

      console.log(this.settings);
      this.pageContent = this.settings[this.pageId+'_page'];
    })


  }

}
