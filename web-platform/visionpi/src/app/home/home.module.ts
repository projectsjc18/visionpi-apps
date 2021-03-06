import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
