import { Component, OnInit , AfterViewInit } from '@angular/core';
import {LiveService} from './live.service';
import {AuthService} from '../auth.service';
import {SocketService} from '../socket.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, AfterViewInit {

  deviceList = [];
  markers = [];
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    // mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    // disableDoubleClickZoom: true,
    maxZoom: 22,
    minZoom: 3,
  };
  constructor(private authService: AuthService, private liveService: LiveService , private socketService: SocketService) { }

  ngOnInit() {
    this.liveService.deviceList().subscribe({
      next: data => {
        console.log('login response ', data.payload.data.devices);
        this.deviceList = data.payload.data.devices;
        this.center = {
          lat: this.deviceList[this.deviceList.length - 1].coordinates.lat,
          lng: this.deviceList[this.deviceList.length - 1].coordinates.lng,
        };
        this.deviceList.forEach(cord => {
          console.log('cord', cord);
          this.addMarker(cord.coordinates.lat, cord.coordinates.lng, cord.serial);
        });
      },
      error: error => {
        console.error('There was an error!', error.error.payload.message);
      }
    });
  }
  ngAfterViewInit() {
    console.log('Get updae loc called 123');
    this.getLocationUpdates();
  }

  addMarker(lati, lngi, serial) {
    this.markers.push({
      id: serial,
      position: {
        lat: lati,
        lng: lngi,
      },
      label: {
        color: 'red',
        text: (this.markers.length + 1).toString(),
      },
      title: (this.markers.length + 1).toString(),
      // options: { animation: google.maps.Animation.BOUNCE },
    });
  }

  getLocationUpdates() {
    console.log('this.markers', this.markers);
    this.socketService.setupSocketConnection().on('update', msg => {
      console.log('Updated ', msg);
      const fleetTobeChanged = this.markers.findIndex(initial => initial.id === msg.id);
      console.log('fleetTobeChanged', fleetTobeChanged, 'this.markers[fleetTobeChanged]',this.markers[fleetTobeChanged]);
      const changing = this.markers[fleetTobeChanged];
      changing.position.lat = msg.coordinates.lat;
      changing.position.lng = msg.coordinates.lng;
      this.markers.splice(fleetTobeChanged, 1);
      this.markers.push(changing);
      // this.markers[fleetTobeChanged].position.lat = msg.coordinates.lat;
      // this.markers[fleetTobeChanged].position.lng = msg.coordinates.lng;



      console.log('finallll marker', this.markers);
    });
    // this.webSocketService.connect('ws://test.rightapps.com.au:3000/').subscribe(msg => {
    //   console.log('success Response from websocket: ' + msg);
    // }, error => {
    //   console.warn('error Response from websocket: ' + error);
    // });
  }

}
