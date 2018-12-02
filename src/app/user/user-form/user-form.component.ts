import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
import { Messages } from 'src/app/shared/enums/messages.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  buttonLabel = 'Salvar';
  title = 'Cadastro';
  buttonDisableForm: boolean;
  color = 'accent';
  disabled = false;

  formErrors = {
    'name': {
      'required': 'Nome é obrigatório.',
      'maxlength': 'Nome deve ter no máximo 256 caracteres.'
    },
    'email': {
      'required': 'E-mail é obrigatório.',
      'email': 'E-mail com formato inválido.'
    },
    'password': {
      'required': 'Senha é obrigatório.',
      'maxlength': 'Senha deve ter no máximo 256 caracteres.'
    },
    'passwordConfirm': {
      'required': 'Confirmar Senha é obrigatório.',
      'maxlength': 'Confirmar Senha deve ter no máximo 256 caracteres.',
      'mismatch': 'Senha incorreta.',
    }
  };

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private auth: AuthenticationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.userFormGroup();
  }

  userFormGroup() {
    this.userForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.maxLength(256)])
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword
    }
    );
  }

  get f() { return this.userForm.controls; }

  saveOrUpdate() {
    if (this.userForm.value.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this.userService.save(this.userForm.value).subscribe((data: any) => {
      this.openDialog(Messages.USER_TITLE_NEW, Messages.USER_INSERT);
    },
    (error: HttpErrorResponse) => {
      this.openDialog(Messages.ERROR, Messages.USER_INSERT_ERROR, error);
    });
  }

  update() {
    this.userService.update(this.userForm.value).subscribe((data: any) => {
      this.openDialog(Messages.USER_TITLE_UPDATE, Messages.USER_UPDATE);
    },
    (error: HttpErrorResponse) => {
      this.openDialog(Messages.ERROR, Messages.USER_UPDATE_ERROR, error);
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
