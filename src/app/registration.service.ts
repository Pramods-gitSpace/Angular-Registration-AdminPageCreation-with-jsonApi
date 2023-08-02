import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl="http://localhost:3000/userList";
  constructor(private httpClient:HttpClient) { }
  postSurvey(body:any){
    return this.httpClient.post(this.baseUrl,body);
   }
  getSurvey(){
    return this.httpClient.get(this.baseUrl);
  }
  getJsonData() {
    return this.httpClient.get("http://localhost:3000/userList");
  }

  
}
