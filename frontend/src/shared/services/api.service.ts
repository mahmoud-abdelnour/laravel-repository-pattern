import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenGetter } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //API_URL = 'https://app.iktissab.sa/api/';
  API_URL = 'https://app.agm-sa.net/api/';
  

  constructor(
    private httpClient:HttpClient
  ) { }

    get(url, params = {}) : Observable<any> {
      return this.httpClient.get(this.API_URL+url,{
        params,
        headers:this.httpHeaders(),
      })
    }

    getFile(url, params = {}) : Observable<any> {
      return this.httpClient.get(this.API_URL+url,{
        params,
        headers:this.httpHeaders(),
        responseType:'blob'
      })
    }

    post(url, data = {}) : Observable<any> {
      return this.httpClient.post(this.API_URL + url, data, {
        headers:this.httpHeaders()
      })
    }

    put(url, data = {}) : Observable<any> {
      return this.httpClient.put(this.API_URL + url, data, {
        headers:this.httpHeaders()
      })
    }

    delete(url, params = {}) : Observable<any> {
      return this.httpClient.delete( this.API_URL + url, {
        params,
        headers:this.httpHeaders()
      })
    }

  uploadFiles(postUrl, myFormData, method = "POST") {
    let headers = new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
    });
    const config = new HttpRequest(method, this.API_URL + postUrl, myFormData, {
      reportProgress: true,
      headers
    });
  
    return this.httpClient.request( config )
  }

  httpHeaders() {
    return {
      'Authorization':tokenGetter()
    }
  }

}
