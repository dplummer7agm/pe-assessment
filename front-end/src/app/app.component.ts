import { Component } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { IncidentService } from './incident.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public incidentService: IncidentService){

  }
  //process form submission
  onSubmit(_formData){
    this.incidentService.uploadFile(_formData.form.value)
    .then((_response)=>{
      debugger
    })
    .catch(ex=>{
      debugger
     
    })
  }

}
