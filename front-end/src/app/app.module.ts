import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IncidentService } from './incident.service';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyCIMHjELgFVTheHFq65fqSF5ZKVLuZY7nI'
    })
  ],
  providers: [IncidentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
