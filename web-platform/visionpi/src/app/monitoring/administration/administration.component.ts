import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MonitoringService } from '../monitoring.service'

@Component({
  selector: 'administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements AfterViewInit {

  displayedColumns: string[] = ['account', 'device', 'type', 'event', 'status', 'created'];
  data: any;
  resultsLength: Number = 5;

  constructor(public monitoringService: MonitoringService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.monitoringService.getAllEvents()
    .subscribe(data => {
      this.data = data;
      console.log("monitoring admin service: " );
      console.log(data);
    });
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }



}
