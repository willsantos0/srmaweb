import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  deviceForm: FormGroup;

  formErrors = {
    'saferId': {
      'required': 'Código de ativação é obrigatório',
      'maxlength': ''
    },
    'name': {
      'required': 'Nome é obrigatório',
      'maxlength': 'Nome deve ter no máximo 256 caracteres'
    },
    'username': {
      'required': 'Nome Curto é obrigatório',
      'maxlength': 'Nome Curto deve ter no máximo 100 caracteres'
    },
    'password': {
      'required': 'Descrição é obrigatório',
      'maxlength': 'Descrição deve ter no máximo 1000 caracteres'
    },
    'passwordConfirm': {
      'required': 'Descrição é obrigatório',
      'maxlength': 'Descrição deve ter no máximo 1000 caracteres'
    },
    'email': {
      'required': 'Descrição é obrigatório',
      'maxlength': 'Descrição deve ter no máximo 1000 caracteres'
    },
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.deviceFormGroup();
  }

  deviceFormGroup() {
    this.deviceForm = this.formBuilder.group({
      id: new FormControl(''),
      saferId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required),
      email: new FormControl('', [ Validators.required, Validators.email ])
    });
  }

  get f() { return this.deviceForm.controls; }

}
