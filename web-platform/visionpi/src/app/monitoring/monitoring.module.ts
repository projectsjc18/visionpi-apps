import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { AdministrationComponent } from './administration/administration.component';
import { MonitoringComponent } from './monitoring.component';


@NgModule({
  declarations: [AdministrationComponent, MonitoringComponent],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    AngularMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoringModule { }
