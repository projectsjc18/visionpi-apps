import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeolocalizationComponent } from './geolocalization.component';
import { AdministrationComponent } from './administration/administration.component';


const routes: Routes = [
  {
    path: '',
    component: GeolocalizationComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: 'administration', component: AdministrationComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeolocalizationRoutingModule { }
