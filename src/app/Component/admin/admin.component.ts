import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from 'src/app/registration.service';
//import for excelexport
import * as XLSX from 'xlsx';
//import for chart.js for graph
import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);
//globalvar for graph
declare let google: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private route:Router,private service:RegistrationService){}
  //users=this.service.userList;
  users:any;
  fileName="Samplesheet.xlsx";
  show=true;
  setSurvey=false;
  setAllResponse=false;
  setGraphResponse=false;
  datestamp=new Date();
  //totalResponse=this.users.length;
  totalResponse:number=1;
  close(){
    this.show=false;
    this.route.navigate([''])
  }
  Excelexport(e:any){
    //give link to excel page at #
    
    if(e.target.value=='excel'){
      if(this.setAllResponse){
      let element=document.getElementById('excel-table')
      const ws: XLSX.WorkSheet= XLSX.utils.table_to_sheet(element)
      const wb: XLSX.WorkBook=XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb,ws,"sheet1")
      XLSX.writeFile(wb,this.fileName)}
    }
 
  }
  dates:[]=[];
  surveyResponse(){
    this.setSurvey=true;
    this.setAllResponse=false;
    this.setGraphResponse=false;
    //this.service.getSurvey().subscribe(result=>
     // this.users=result
      //);
    this.totalResponse=this.users.length;
  }
  allResponse(){
    this.setAllResponse=true;
    this.setSurvey=false;
    this.setGraphResponse=false;
    this.service.getSurvey().subscribe(result=>this.users=result);
  }
  uniquedates:string[]=[];
  locationsArray:string[]=[];
  countHyd:number=0;
  countChennai:number=0;
  countPune:number=0;
  countBang:number=0;
  graphResponse(){
    this.setGraphResponse=true;
    this.setAllResponse=false;
    this.setSurvey=false;
    //chart.js
    //bar chart
    this.service.getJsonData().subscribe(
      result=>{
        this.chartdata=result;
        if(this.chartdata!=null){
          //printUniquedateData(this.chartdata.date);
          let response:number[]=[];
          let start=false;
          let count=0;
          for(let i=0;i<this.chartdata.length;i++){           
            for(let j=0;j<this.uniquedates.length;j++){
              if(this.chartdata[i].date==this.uniquedates[j]){
                start=true;
              }
            }  
            count++;
            if(count==1 && start ==false){
              this.uniquedates.push(this.chartdata[i].date);
              this.labeldata.push(this.chartdata[i].date);
              
            }
            start=false;
            count=0; 
            }
            for(let i=0;i<this.uniquedates.length;i++){ 
              response[i]=0;          
              for(let j=0;j<this.chartdata.length;j++){
                  if(this.uniquedates[i]==this.chartdata[j].date){
                    response[i]+=1;
                  }
              }
              this.realdata.push(response[i]);
            }

              console.log(this.uniquedates)
            this.RenderChart(this.labeldata,this.realdata,'bar','barchart');
        }
      }
    );
    //pie chart for locations
    this.service.getJsonData().subscribe(
      result=>{
        this.chartdata=result;
        if(this.chartdata!=null){
          for(let i=0;i<this.chartdata.length;i++){
            for(let j=0;j<this.chartdata[i].location.length;j++){
            this.locationsArray.push(this.chartdata[i].location[j])}
          }
          for(let i=0;i<this.locationsArray.length;i++){
            console.log(this.locationsArray[i]);
            if(this.locationsArray[i]=="hyderabad"){
            this.countHyd+=1;}
            else if(this.locationsArray[i]=="pune"){
              this.countPune+=1;}
              else if(this.locationsArray[i]=="chennai"){
                this.countChennai+=1;}
                else if(this.locationsArray[i]=="banglore"){
                  this.countBang+=1;}
          }
          console.log(this.countHyd);
          console.log(this.countPune);
          this.RenderPieChart('pie','piechart');




        }

      }
    );
    
     
  }
  ///graph response
  
  ////for chart.js
  chartdata:any=[];
  labeldata:any=[];
  realdata:any=[];
  ngOnInit() {
    this.service.getSurvey().subscribe(result=>
      this.users=result
       );
   
  }

  RenderChart(labeldata:any,maindata:any,type:any,id:any){
    let myChart:any=null;
    //to destroy repeated chart response
    if(myChart!=null){
    myChart.destroy();
    }
    myChart=new Chart(id,{
      type:type,
      data:{
        labels:labeldata,
        datasets:[{
          label:'Survey Response',
          data:maindata,
          backgroundColor:['brown','yellow',
                          'grey','blue','orange','pink'],
          borderColor:['white'],
        }]
      },
      options:{
        scales:{
          y:{
            beginAtZero:true,
          }
        }
      }
    });
  }

  RenderPieChart(type:any,id:any){
    let myChart:any=null;
    //to destroy repeated chart response
    if(myChart!=null){
    myChart.destroy();
    }
    myChart=new Chart(id,{
      type:type,
      data:{
        labels:['Hyderabad','Pune','Chennai','Banglore'],
        datasets:[{
          label:'Survey Response',
          data:[this.countHyd,this.countPune,this.countChennai,this.countBang],
          backgroundColor:['brown','yellow',
                          'grey','blue','orange','pink'],
          borderColor:['white'],
        }]
      },
      options:{
        scales:{
          y:{
            beginAtZero:true,
          }
        }
      }
    });
  }

  
}
