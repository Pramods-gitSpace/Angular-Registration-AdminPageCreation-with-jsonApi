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

  userList=[
    {
      'id':1,
      'name':"pramod",
      'email':'pramod@Wipro.com',
      'reason':'have some issuedd jhhhhjgerguyugyuhdsncjn hhgghdfeyfefhuef',
      'location':['hyderabad','chennai'],
      'date':'2017-06-07'
    },
    {
      'id':2,
      'name':"vinod",
      'email':'vinod@Wipro.com',
      'reason':'have some issuedd jhhhhjgerguyugyuhdsncjn hhgghdfeyfefhuef',
      'location':['hyderabad','chennai','pune'],
      'date':'2017-06-07'
    },
    {
      'id':3,
      'name':"sbghbhbhc",
      'email':'cmmkmkcjkjc@Wipro.com',
      'reason':'have some issuedd jhhhhjgerguyugyuhdsncjn hhgghdfeyfefhuef',
      'location':['hyderabad'],
      'date':'2017-06-07'
    },
    {
      'id':4,
      'name':"vamshi",
      'email':'vamshi@Wipro.com',
      'reason':'have some issuedd jhhhhjgerguyugyuhdsncjn hhgghdfeyfefhuef',
      'location':['hyderabad','chennai'],
      'date':'2017-06-07'
    }
  ]


}
