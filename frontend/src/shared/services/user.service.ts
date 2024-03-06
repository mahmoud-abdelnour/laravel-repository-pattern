import { Injectable } from '@angular/core';
import { UserType } from '../enums/user-type';
import { ApiService } from './api.service';
import { Endpoints } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData;
  userPermissions;
  userNotifications ;
  unread_Notifications;
  constructor(
    private apiService:ApiService
  ) {
   this.getData();
   this.getSettings();
  //  this.getNotifcations();
  }

  getData() {
    this.userData = JSON.parse(localStorage.getItem('user')) || {};
    this.userPermissions = {};
    this.setPermissions();


    // this.userData.user_type == UserType.employee ? Endpoints.employee.profile : Endpoints.company.profile
    if(localStorage.getItem('access_token') && this.userData.user_type != null) this.apiService.get( Endpoints[this.userData.user_type].profile ).subscribe( r => {
      
      console.log('ssssssss');
      console.log(r.user);

      this.userData = r.user;
      this.userPermissions = {};
      this.setPermissions();
      //console.log(this.userPermissions);
      localStorage.setItem('user', JSON.stringify(r.user));
    })
  }

  setPermissions() {
    for(let p of this.userData.permissions || []) {
      this.userPermissions[p.name] = true;
      for (let sub of p.permissions || []) this.userPermissions[sub.name] = sub.isGranted
    }
  }

  getNotifcations(){
    this.apiService.get(Endpoints.misc.notifications+"?top5=true").subscribe( r => {
      this.userNotifications = r.notifications;
      this.unread_Notifications = r.unread_count;
    })
  }

  settings;
  getSettings(){
    this.apiService.get(Endpoints.misc.settings).subscribe( r => {
      this.settings = r.settings;
    })
  }

  readNotification(id){
    this.apiService.get(Endpoints.misc.read_notifications+"/"+id).subscribe( r => {
        //console.log(r);
        if(r.url){
          window.location = r.url;
        }

    })
  }

}
