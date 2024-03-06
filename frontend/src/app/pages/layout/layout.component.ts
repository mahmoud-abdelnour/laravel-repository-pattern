import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TableComponent } from 'src/shared/components/table/table.component';
import { UserType } from 'src/shared/enums/user-type';
import { langFunc } from 'src/shared/functions/lang.functions';
import { UserService } from 'src/shared/services/user.service';
import { Routes } from './routes';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('headerEle') headerEle:ElementRef;
  @ViewChild('mainEle') mainEle:ElementRef;
  Routes = Routes;
  UserType = UserType

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.adjustHeader();
  } 

  adjustHeader() {
    if(this.dialog.openDialogs.length) return;
    let top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
    if(top >= 194) {
      this.headerEle.nativeElement.classList.add('fixed');
    } else this.headerEle.nativeElement.classList.remove('fixed');

    this.mainEle.nativeElement.style.minHeight = (window.innerHeight + 100) - (194 + 53)  + 'px';
    // if(top >= 104) {
    //   this.headerEle.nativeElement.classList.add('add-bg')
    //   console.log()
    // } else {
    //   this.headerEle.nativeElement.classList.remove('add-bg');
    //   // this.mainEle.nativeElement.style.marginTop = -1 *  (7.5 -  (7.5* (top/133)))  + 'rem'
    //   this.mainEle.nativeElement.style.marginTop = 76 + top  - 4  + 'px'
      
    // }
  }
 
  constructor(
  public  dialog: MatDialog,
  private translateService:TranslateService,
  public  userService:UserService,
  private router:Router,
  private apiService:ApiService,
  public themeService:ThemeService

  ) {
    
  }

  ngAfterViewInit(): void {
    this.adjustHeader();
  }

  defaultLang;
  profileUrl;
  innerWidth;
  settingUrl;
  ngOnInit(): void {
    this.profileUrl = this.userService.userData.user_type
    this.defaultLang = langFunc(this.translateService.defaultLang);
    this.profileUrl = this.userService.userData.user_type == UserType.provider ? '/provider-profile' : '/profile';
    this.settingUrl = "settings";
    this.innerWidth  = window.innerWidth;

    this.userService.getNotifcations();


    console.log(this.userService);
  }

  changeLang(lang) {
    this.translateService.use(lang);
    this.defaultLang = langFunc(this.translateService.defaultLang)
  }

  openDialog() {
    const dialogRef = this.dialog.open(TableComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.apiService.post(Endpoints.save_logout, )
    .subscribe( (response:any) => {
        localStorage.clear();
        localStorage.setItem('lang', this.translateService.defaultLang);
        this.userService.userData = {};
    })
  
    let userType = this.userService.userData.user_type

    this.router.navigate([userType == UserType.provider ? '/auth/login-provider' : '/auth/login']);
  }
}
