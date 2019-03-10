import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IncidentService {

  constructor(public http:HttpClient) { }

  /** upload the incident file to the server
   * @param {NgForm} _formData
   */
  uploadFile(_formData){

   
    return new Promise((resolve,reject)=>{

        //send the form data to the server
       let obs = this.http.post('http://localhost:3000/api/incident/process',_formData)
        .subscribe((_response)=>{
          debugger
          //resolve the promise 
        resolve(_response);
        obs.unsubscribe();
       },(_error)=>{

          //reject the promise
         reject(_error);
        obs.unsubscribe();
       },()=>{
        debugger
         obs.unsubscribe();
       });
       
    })
  }

}
