import { Component, OnInit } from '@angular/core';
import {UserAccessService} from './user-access.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {
  requests = [];
  constructor(private userAccessService: UserAccessService) { }

  ngOnInit() {
    this.getUserAccessDetails();
  }

  getUserAccessDetails() {
    console.log('get details');
    this.userAccessService.getAccessDetails().subscribe(result => {
      const data: any = result;
      console.log('data', data.payload.data.requests);
      this.requests = data.payload.data.requests;
      console.log('requests', this.requests);
    }, error => {

      });
  }

  acceptUser(user) {
    console.log('Accept User', user._id);
    this.userAccessService.userAction(user._id, 'accept').subscribe(result => {
      const data: any = result;
      console.log('data', data);
      if (data.status) {
        const idx = this.requests.findIndex(req => req._id == user._id);
        console.log('relevant id', idx);
        this.requests[idx].status = 'accepted';
      }
    }, error => {
      console.warn('error', error);
    });
  }

  rejectUser(user) {
    console.log('Reject User', user._id);
    this.userAccessService.userAction(user._id, 'reject').subscribe(result => {
      const data: any = result;
      console.log('data', data);
      if (data.status) {
        const idx = this.requests.findIndex(req => req._id == user._id);
        console.log('relevant id', idx);
        this.requests[idx].status = 'rejected';
      }
    }, error => {
      console.warn('error', error);
    });
  }

}
