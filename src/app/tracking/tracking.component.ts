import { Component, OnInit } from '@angular/core';
import { Tracking } from '../shared/models/tracking.model';
import { TrackingService } from '../shared/services/tracking.service';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../shared/layout/modal/modal-dialog/modal-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Messages } from '../shared/enums/messages.enum';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsService } from '../shared/services/google-maps.service';
import { InfoLocation } from '../shared/models/info-location';
import { Alert } from '../shared/enums/alert.enum';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  name = 'Rastreamento de Dispositivos';
  lat = -18.9113;
  lng = -48.2622;
  zoom = 15;
  listTrackings: Tracking[];
  srmaCode: string;
  infoLocations: InfoLocation[] = [];

  constructor(private trackingService: TrackingService,
    private googleMapsService: GoogleMapsService,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.srmaCode = params['srmaCode'];
      this.getAll();
    });
  }

  getAll() {
    this.trackingService.getAll().subscribe((result: any) => {
      this.listTrackings = result;

      if (this.srmaCode) {
        this.listTrackings = [];
        this.listTrackings[0] = result.filter(x => x.srmaCode === this.srmaCode)[0];
      }

      this.listTrackings.forEach((element: Tracking) => {
        this.getAddressByLatLng(element.latitude, element.longitude, element);
      });
    },
    (error: HttpErrorResponse) => {
      this.openDialog(Messages.ERROR, Messages.TRACKING_GET_ERROR, error);
    });
  }

  getAddressByLatLng(lat, lng, tracking) {
    this.googleMapsService.getAddressByLatLng(lat, lng).subscribe((result: any) => {
      const infoLocation = new InfoLocation();
      infoLocation.srmaCode = tracking.srmaCode;
      infoLocation.alert = tracking.device.alert;
      infoLocation.description = tracking.device.description;
      infoLocation.address = result.results[0].formatted_address;

      this.infoLocations.push(infoLocation);
    });
  }

  openDialog(title: string, message: string, error?: HttpErrorResponse): void {
    this.dialog.open(ModalDialogComponent, {
      position: { top: '6%' },
      data: { title: title, message: message }
    });

    if (error) {
      console.log(error.message);
    }
  }

  getColor(alert) {
    switch (alert) {
      case Alert.NO_ACTIVITY:
        return 'black';
      case Alert.MOTION_DETECTED:
        return 'red';
    }
  }

}
