import {Component, OnInit, AfterViewInit, NgZone} from '@angular/core';
import {LiveService} from './live.service';
import {AuthService} from '../auth.service';
import {SocketService} from '../socket.service';
declare var $: any;
@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, AfterViewInit {

  deviceList = [];
  copyDeviceList = [];
  markers = [];
  copyMarkers = [];
  isSingleDeviceSelected = false;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    // mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 22,
    minZoom: 3,
  };
  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private liveService: LiveService , private socketService: SocketService, private ngZone: NgZone) { }

  ngOnInit() {
    this.getDevicesList();
  }
  ngAfterViewInit() {
    console.log('Get updae loc called 123');
    const mapContainer: any = document.querySelector('.map-container');
    console.log(mapContainer);
    mapContainer.style.borderRadius = '10px';
    mapContainer.style.boxShadow = '1px 3px 8px #9f9f9f';
    this.getLocationUpdates();
  }

  getDevicesList() {
    this.liveService.deviceList().subscribe({
      next: result => {
        const data: any = result;
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

  addMarker(lati, lngi, serial) {
    this.markers.push({
      id: serial,
      position: {
        lat: lati,
        lng: lngi,
      },
      label: {
        color: 'white',
        text: serial.toString(),
      },
      // title: serial.toString(),
      // options: { animation: google.maps.Animation.BOUNCE },
    });
  }

  getLocationUpdates() {
    console.log('this.markers', this.markers);
    this.socketService.setupSocketConnection().on('update', msg => {
      // console.log('Updated ', msg);
      const fleetTobeChanged = this.markers.findIndex(initial => initial.id === msg.id);
      // console.log('fleetTobeChanged', fleetTobeChanged, 'this.markers[fleetTobeChanged]', this.markers[fleetTobeChanged]);
      const changing = this.markers[fleetTobeChanged];
      if (typeof this.markers[fleetTobeChanged] !== 'undefined') {
        this.markers.splice(fleetTobeChanged, 1);
        this.ngZone.run(() => {
          this.addMarker(msg.coordinates.lat, msg.coordinates.lng, msg.id);
        });
      }
    });
  }

  viewSelectedDevice(device) {
    if (!this.isSingleDeviceSelected) {
      console.log('Device selected' , device);
      const id = device.serial;
      const idx = this.deviceList.findIndex(dev => dev.serial === device.serial);
      const fleetTobeChanged = this.markers.findIndex(initial => initial.id === device.serial);
      const showMarker = this.markers[fleetTobeChanged];
      this.copyMarkers = this.markers;
      this.markers = [];
      this.markers.push(showMarker);
      console.log('idx', idx);
      this.copyDeviceList = this.deviceList;
      const view = this.deviceList[idx];
      this.deviceList = [];
      this.deviceList.push(view);
      this.isSingleDeviceSelected = true;
    }
  }

  viewAllDevices() {
    if (this.isSingleDeviceSelected) {
      console.log('View All devices');
      this.deviceList = [];
      this.deviceList = this.copyDeviceList;
      this.isSingleDeviceSelected = false;
      this.markers = this.copyMarkers;
    }
  }

}
