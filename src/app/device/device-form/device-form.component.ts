import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/shared/services/device.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Messages } from 'src/app/shared/enums/messages.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {

  title = 'Cadastro';
  buttonLabel = 'Salvar';
  deviceForm: FormGroup;

  formErrors = {
    'srmaCode': {
      'required': 'Código de ativação é obrigatório.',
      'maxlength': 'Código de ativação deve ter no máximo 50 caracteres.'
    },
    'description': {
      'maxlength': 'Descrição deve ter no máximo 50 caracteres.'
    }
  };

  constructor(public dialogRef: MatDialogRef<DeviceFormComponent>,
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.deviceFormGroup();
  }

  get f() { return this.deviceForm.controls; }

  deviceFormGroup() {
    this.deviceForm = this.formBuilder.group({
      srmaCode: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', Validators.maxLength(50))
    });
  }

  closeModalForm() {
    this.dialogRef.close();
  }

  save() {
    this.deviceService.save(this.deviceForm.value).subscribe((data: any) => {
      this.closeModalForm();
      this.openDialog(Messages.DEVICE_TITLE_NEW, Messages.DEVICE_INSERT);
    },
    (error: HttpErrorResponse) => {
      this.closeModalForm();
      this.openDialog(Messages.ERROR, Messages.DEVICE_INSERT_ERROR, error);
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
