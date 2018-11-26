import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  title = 'Cadastro';

  constructor(public dialogRef: MatDialogRef<UserModalComponent>) { }

  ngOnInit() {
  }

  closeModalForm() {
    this.dialogRef.close();
  }

}
