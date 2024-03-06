import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './api.service';
import { Endpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private _snackBar: MatSnackBar,
    private translateService:TranslateService,
    private apiService:ApiService
    ) {
      this.getEnums();
      this.getSettings();
    }
  
  openSnackBar(
    title,
    button = null,
    panelClass = 'success',
    horizontalPosition:MatSnackBarHorizontalPosition = 'right',
    verticalPosition:MatSnackBarVerticalPosition =  'top',
  ) {
    this._snackBar.open( this.translateService.instant(title), button ? this.translateService.instant(button) : null, {
      horizontalPosition,
      verticalPosition,
      panelClass,
      duration:2000
    });
  }
  globalSettings;
  oldSettings;
  settings;
  getEnums() {
    this.settings = JSON.parse(localStorage.getItem('settings')) || {};
    
    this.apiService.get(Endpoints.enums).subscribe( settings => {
      this.oldSettings = {...settings};
      for(let key in settings) {
        let arr = [];
        let enum_obj = {};

        for(let item in settings[key]) {
          arr.push({
            title:item,
            value: settings[key][item]
          });
          enum_obj[item] = settings[key][item];
          enum_obj[settings[key][item]] = item;
          delete settings[key][item];
        }
        settings[key].arr = arr;
        settings[key].enum = enum_obj;
      }
      this.settings = settings;
      localStorage.setItem('settings', JSON.stringify(settings))
    })
  }

  getSettings() {
    this.globalSettings = JSON.parse(localStorage.getItem('gloabalSettings')) || {};
    this.apiService.get(Endpoints.provider.settings).subscribe( res => {
      this.globalSettings = res.settings;
      localStorage.setItem('gloabalSettings', JSON.stringify(res.settings))
    })
  }
}
