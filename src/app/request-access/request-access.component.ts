import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestAccessService} from './request-access.service';
declare var $: any;
@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {
  isRequestAccessError = false;
  requestAccessError = '';
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    contact: new FormControl(''),
    reason: new FormControl(''),
  });
  constructor(private accessService: RequestAccessService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.accessService.requestAccess(this.profileForm.value).subscribe({
      next: data => {console.log('success', data);
                     $('#exampleModal').modal('show');
      },
      error: error => {
        console.error('There was an error!', error.error.payload.message);
        this.requestAccessError = error.error.payload.message;
        this.isRequestAccessError = true;
      }
    });
  }

  onModalOk() {
    $('#exampleModal').modal('hide');
  }
}
