import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/registration.service';
import emails, { EmailJSResponseStatus } from '@emailjs/browser'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{
  show=true;
  customText="";
  jsonData:any;
  loc=['Pune','Hyderabad','Chennai','Banglore'];
   constructor(private fb:FormBuilder,private rs:RegistrationService ,private route:Router){}
   formatDate(date=new Date()){
    const year=date.toLocaleString('default',{year:'numeric'});
    const month=date.toLocaleString('default',{month:'2-digit'});
    const day=date.toLocaleString('default',{day:'2-digit'})
    return [year,month,day].join('-');
   }
  userAccess:any=this.fb.group({
    name:["",[Validators.required,Validators.minLength(4)]],
    email:["",[Validators.pattern(/@gmail.com/)]],
    reason:["",[Validators.required]],      
    date:[this.formatDate(new Date()),[Validators.required]],
    location:this.fb.array([]),
  });

    
    update(input:any){}
    updateText(e:any){
      this.customText=e.target.value;
    }
    
    handleLocation(e:any){
      console.log(e.target.value);
      let langArray=this.userAccess.get('location') as FormArray;
      if(e.target.checked){
        langArray.push(new FormControl(e.target.value))
      }
    }
    //handle service post request

    formClicked(){
        console.log(this.userAccess.controls.reason)
        console.log(this.userAccess.status)
        console.log(this.userAccess.controls.name.value)
        console.log(this.userAccess.controls.reason.value)
        console.log(this.userAccess.controls.location.value)
        if(this.userAccess.status=='VALID'){
          alert("Registered sucessfully \n\n"+ JSON.stringify(this.userAccess.value,null,4));
          this.show=false;
          this.route.navigate(['']);
          //api parameters
          let body:any={
            name:this.userAccess.controls.name.value,
            email:this.userAccess.controls.email.value,
            reason:this.userAccess.controls.reason.value,
            location:this.userAccess.controls.location.value,
            date:this.userAccess.controls.date.value,
      
          }
          this.rs.postSurvey(body).subscribe(
            (res)=>{
              console.log(res);
            }
          )}
          /////email
          emails.init('UNROVDIQ47aBj6nOL');
           let response= emails.send("service_rwfi8fn","template_g4favof",{
            to_email:this.userAccess.controls.email.value,
            from_name: "jspiders",
            to_name: this.userAccess.controls.name.value,
            subject: "Jspider FullStack Registration",
            message: "You have successfully regisered for FullStack technology",
            });
           alert("message has been sent..!");
    }
    
    close(){
      this.show=false;
      this.userAccess.value=null;
      this.route.navigate(['']);
    }





}
