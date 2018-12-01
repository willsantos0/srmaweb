import { Component, OnInit, ViewChild } from '@angular/core';
import { Device } from 'src/app/shared/models/device.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DeviceService } from 'src/app/shared/services/device.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';
import { ModalConfirmDialogComponent } from 'src/app/shared/layout/modal/modal-confirm-dialog/modal-confirm-dialog.component';
import { Messages } from 'src/app/shared/enums/messages.enum';
import { DeviceFormComponent } from '../device-form/device-form.component';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices: Device[];
  title: string;
  displayedColumns: string[] = ['srmaCode', 'description', 'customSrmaCode'];
  dataSource: MatTableDataSource<Device>;
  message: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private deviceService: DeviceService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getDevices();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openModal(device?: Device) {

    const modalDeviceForm = this.dialog.open(DeviceFormComponent, {
      data: { device: null },
      position: { top: '2%' },
      width: '800px'
    });

    modalDeviceForm.afterClosed().subscribe(result => {

    });
  }

  getDevices() {
    this.deviceService.getAll().subscribe((data: any) => {

      this.dataSource = new MatTableDataSource<Device>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      });
  }

  deleteDevice(saferId: string) {
    this.deviceService.delete(saferId).subscribe((result: boolean) => {
      if (result) {
        this.openDialog(Messages.DEVICE_TITLE_DELETE, Messages.DEVICE_DELETE);
      }
    },
      (err: HttpErrorResponse) => {
        this.openDialog(Messages.ERROR, Messages.DEVICE_DELETE_ERROR, err);
      });
  }

  openConfirmDialog(device: Device): void {
    this.title = 'O device "' + device.srmaCode + '" será excluído. Deseja continuar?';

    const dialogRef = this.dialog.open(ModalConfirmDialogComponent, {
      position: { top: '6%' },
      data: { title: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDevice(device.srmaCode);
      }
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
