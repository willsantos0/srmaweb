import { Component, OnInit } from '@angular/core';
import { Tracking } from '../shared/models/tracking.model';
import { TrackingService } from '../shared/services/tracking.service';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../shared/layout/modal/modal-dialog/modal-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Messages } from '../shared/enums/messages.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  name = 'Rastreamento de Dispositivos';
  lat = -18.9113;
  lng = -48.2622;
  zoom = 14;
  listTrackings: Tracking[];
  srmaCode: string;

  constructor(private trackingService: TrackingService,
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
