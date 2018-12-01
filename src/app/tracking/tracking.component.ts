import { Component, OnInit } from '@angular/core';
import { Tracking } from '../shared/models/tracking.model';
import { TrackingService } from '../shared/services/tracking.service';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../shared/layout/modal/modal-dialog/modal-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Messages } from '../shared/enums/messages.enum';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  name: string = 'Rastreamento de Dispositivo';
  lat: number = -18.9113;
  lng: number = -48.2622;
  zoom = 11;
  listTrackings: Tracking[];

  constructor(private trackingService: TrackingService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.trackingService.getAll().subscribe((result: any) => {
      this.listTrackings = result;
    },
    (error: HttpErrorResponse) => {
      this.openDialog(Messages.ERROR, Messages.TRACKING_GET_ERROR, error);
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

}
