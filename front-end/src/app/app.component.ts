import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { IncidentService } from './incident.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public formData:FormGroup;
  constructor( public formBuilder: FormBuilder, public incidentService: IncidentService){
    this.formData = this.formBuilder.group({
      incidentFile : null
    })
  }
  //process form submission
  submit(){
    let data = new FormData();
    data.append('incidentFile',this.formData.get('incidentFile').value);
    
    
    this.incidentService.uploadFile(data)
    .then((_response)=>{
      alert(_response);      
    })
    .catch(ex=>{
      debugger
     
    })
  }

  /** detect when a file has been provided by the user and store it in the formData variable*/
  fileChange(_event){
    //if a file has been provided, assign it to the form group
    if(_event.target.files.length > 0){
      this.formData.get("incidentFile").setValue(_event.target.files[0])
      this.submit();
    }else{
      this.formData.get("incidentFile").setValue(null);
      
    }
  
  }



}
