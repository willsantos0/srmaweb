import { Tracking } from './../../shared/models/tracking.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/shared/models/device.model';
import { TrackingService } from 'src/app/shared/services/tracking.service';
import { MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Messages } from 'src/app/shared/enums/messages.enum';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-tracking-detail',
  templateUrl: './tracking-detail.component.html',
  styleUrls: ['./tracking-detail.component.css']
})
export class TrackingDetailComponent implements OnInit {

  tracking: Tracking[] = [];
  srmaCode: string;
  lat: number = -18.9113;
  lng: number = -48.2622;
  zoom = 11;

  constructor(private route: ActivatedRoute,
    private trackingService: TrackingService,
    public dialog: MatDialog) {
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.srmaCode = params['srmaCode'];
      this.get();
    });
  }

  get() {
    this.trackingService.get(this.srmaCode).subscribe((result: any) => {
      this.tracking[0] = result;
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
