import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup , Validators} from '@angular/forms';
import {RequestAccessService} from './request-access.service';
@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {
  isRequestAccessError = false;
  requestAccessError = '';
  profileForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl(''),
    contact: new FormControl('', [Validators.required, Validators.pattern('^(\\+\\d{1,3}[- ]?)?\\d{10}$')]),
    reason: new FormControl(''),
  });
  constructor(private accessService: RequestAccessService) { }
  ngOnInit() {
    console.log(this.profileForm);
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    const modal: any = document.querySelector('#myModal');

    // document.querySelector('#exampleModal');
    // $('#exampleModal').modal('show');
    // this.accessService.requestAccess(this.profileForm.value).subscribe({
    //   next: data => {console.log('success', data);
    //                  modal.style.display = 'block';
    //   },
    //   error: error => {
    //     console.error('There was an error!', error.error.payload.message);
    //     this.requestAccessError = error.error.payload.message;
    //     this.isRequestAccessError = true;
    //   }
    // });
  }

  onModalOk() {
    const modal: any = document.querySelector('#myModal');
    modal.style.display = 'none';
  }
}
