import { Component, OnInit, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { GeolocalizationService } from '../services/geolocalization.service';
import { Checkpoint } from '../models/checkpoint';
import { Route } from '../models/route';

@Component({
  selector: 'tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  routes: Route[] = [];
  maps: any;
  points: Object[] = [];
  colsWeb: number = 1;
  rowsWeb: number = 1;
  colsMobile: number = 2;
  rowsMobile: number = 1;

  constructor(private breakpointObserver: BreakpointObserver, private geolocalizationService: GeolocalizationService) {}

  ngOnInit() {
    this.loadRoutes().then(value => {
      console.log(value);
      this.loadMaps();
    });
    this.maps = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          for (var point in this.routes){
            var newPoint = {
              routeName: this.routes[point].route,
              operator: this.routes[point].operator,
              checkpoints: this.routes[point].checkpoints,
              cols: this.colsMobile,
              rows: this.rowsMobile
            }
            this.points.push(newPoint)
          }
          return this.points;
        }

        for (var point in this.routes){
          console.log("Validacion One" + this.colsWeb);
          if(point == "0"){
            this.colsWeb = this.colsWeb
          }else{
            this.colsWeb = 1
          }
          console.log("Validacion Two" + this.colsWeb);
          var newPoint = {
            routeName: this.routes[point].route,
            operator: this.routes[point].operator,
            checkpoints: this.routes[point].checkpoints,
            cols: this.colsWeb,
            rows: this.rowsWeb
          }
          this.points.push(newPoint)
        }
        return this.points;
      })
    );
  }

  loadMaps() {
    this.maps = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          for (var point in this.routes){
            var newPoint = {
              routeName: this.routes[point].route,
              operator: this.routes[point].operator,
              checkpoints: this.routes[point].checkpoints,
              cols: this.colsMobile,
              rows: this.rowsMobile
            }
            this.points.push(newPoint)
          }
          return this.points;
        }

        for (var point in this.routes){
          console.log("Validacion One" + this.colsWeb);
          if(point == "0"){
            this.colsWeb = this.colsWeb
          }else{
            this.colsWeb = 1
          }
          console.log("Validacion Two" + this.colsWeb);
          var newPoint = {
            routeName: this.routes[point].route,
            operator: this.routes[point].operator,
            checkpoints: this.routes[point].checkpoints,
            cols: this.colsWeb,
            rows: this.rowsWeb
          }
          this.points.push(newPoint)
        }
        return this.points;
      })
    );
  }

  /*loadCheckpoints() {
    this.geolocalizationService.getAllCheckpoints().subscribe(checkpoints => {
      this.checkpoints = checkpoints
    });

  }*/

  loadRoutes() {
    var routesPromise = new Promise<string>((resolve, reject) => {
      this.geolocalizationService.getAllRoutes().subscribe(routes => {
        this.routes = routes;
        resolve('Ok');
      });
    });
    return routesPromise;
  }
}
