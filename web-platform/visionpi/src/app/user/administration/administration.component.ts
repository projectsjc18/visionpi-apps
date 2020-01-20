import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SuccessfulRegistration } from '../messages/successful-registration.component'

export interface Profile {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements AfterViewInit  {
  displayedColumns: string[] = ['user', 'firstname', 'lastname', 'email', 'profile', 'created'];
  genres: string[] = ['Female', 'Male', 'Other'];
  profiles: Profile[] = [
    {value: 'Deus', viewValue: 'Deus'},
    {value: 'Warrior', viewValue: 'Warrior'},
    {value: 'Mortal', viewValue: 'Mortal'}
  ];
  services = [
    { id:1, description:'Dashboard' },
    { id:1, description:'User' },
    { id:1, description:'Geolocalization' },
    { id:1, description:'Monitoring' },
    { id:1, description:'Surveillance' }
  ];
  permissions: string[] = ['Read', 'Write'];
  notifications: string[] = ['Telephone', 'Email', 'SMS'];
  data: any;
  hide = true;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  userForm;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  step = 0;

  constructor(private formBuilder: FormBuilder, public userService: UserService,
              public dialog: MatDialog) {
    this.userForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      gender: '',
      birthday: '',
      profile: '',
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      username: '',
      password: '',
      confirmPassword: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      platforms: new FormGroup({
        services: new FormArray([]),
        permissions: new FormArray([]),
        notifications: new FormArray([])
      })
    });

    this.addServices();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.userService.getAll()
    .subscribe(data => {
      this.data = data;
      console.log("user admin service: " + this.data)
    });
  }

  setStep(index: number) { this.step = index; }

  nextStep() { this.step++; }

  prevStep() { this.step--; }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  onSubmit(userData) {
    console.log('userdata: ' + userData);
    const selectedServices = this.userForm.controls.platforms.value.services
      .map((v, i) => v ? this.services[i].description : null)
      .filter(v => v !== null);
    console.log(selectedServices);
    userData.platforms.services = selectedServices;
    this.userService.register(userData)
    .subscribe(data => {
      this.openDialog(userData.username);
    });
  }

  get email() { return this.userForm.get('email'); }

  private addServices() {
    this.services.forEach((o, i) => {
      const control = new FormControl();
      (this.userForm.controls.platforms.controls.services as FormArray).push(control);
    });
  }

  private openDialog(username) {
    const session = JSON.parse(localStorage.getItem('session'));
    const dialogRef = this.dialog.open(SuccessfulRegistration, {
      width: '300px',
      data: {user: session.clientId, newUser: username}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.userForm.reset();
      this.updateUsers();
      //this.newUser = result;
    });
  }

  private updateUsers() {
    this.userService.getAll()
    .subscribe(data => {
      this.data = data;
      console.log("update users");
    });
  }

}
