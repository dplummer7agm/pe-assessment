import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { IncidentService } from './incident.service';
import { MouseEvent} from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //set the starting coordinates (Virginia Union University)
  lat:number = 37.561759800000004;
  lng:number = -77.4510597886061;
  
  //set the zoom level for the map
  zoom:number = 15;

  public incidentData:any = {
    address : {},
    description : {}
  };



  pins: any[] = [
  ]
  formData:FormGroup;


  constructor( public ngZone: NgZone, public formBuilder: FormBuilder, public incidentService: IncidentService){
    this.formData = this.formBuilder.group({
      incidentFile : null
    })
    
  }

  /** submit the file to the server */
  submit(){

    //format the form data
    let data = new FormData();
    data.append('incidentFile',this.formData.get('incidentFile').value);
    
    //upload the form data
    this.incidentService.uploadFile(data)
    .then((_response:any)=>{
     
      //update the incident data asynchronously and force a UI refresh for any data bound elements
      this.ngZone.run(()=>{
      //store the incident data in a local variable
      this.incidentData = _response.response;
      if(_response.error)
        alert(_response.error)
      else
        this.refreshPins();
      })
      
    })
    .catch(ex=>{

      //display an error message
      alert(ex.error.error)
     
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





  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }



  refreshPins(){
    this.pins = [];
    this.pins.push({
		  lat: this.incidentData.address.latitude ||this.lat,
		  lng: this.incidentData.address.longitude ||this.lng,
		  label: 'Incident '+(this.pins.length+1),
		  draggable: true
	  })
  }
  

}


// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

