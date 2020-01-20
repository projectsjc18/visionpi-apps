import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeolocalizationRoutingModule } from './geolocalization-routing.module';
import { AdministrationComponent } from './administration/administration.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { GeolocalizationComponent } from './geolocalization.component';
import { MapComponent } from './map/map.component';
import { TrackerComponent } from './tracker/tracker.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AdministrationComponent, ConfigurationComponent, GeolocalizationComponent, MapComponent, TrackerComponent],
  imports: [
    CommonModule,
    GeolocalizationRoutingModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3j8h3zpEvJQk9yBw9HYdZou8RMJdlPWM'
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeolocalizationModule { }
