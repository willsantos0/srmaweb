import { AuthenticationService } from './../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showMessageError = false;
  loading = false;
  loginForm: FormGroup;
  logo = '../assets/images/logoLogin.png';
  loadingGif = '../assets/images/loading.gif';

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginFormGroup();
  }

  loginFormGroup() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get f() { return this.loginForm.controls; }


  OnSubmit() {
    this.showMessageError = false;
    this.loading = true;

    this.authenticationService.login(this.loginForm.value).subscribe((data: any) => {
      if (data.authenticated) {
        localStorage.setItem('access_token', data.access_token);
        this.router.navigate(['/home']);
      } else {
        this.showMessageError = true;
        this.loading = false;
      }
    },
      (err: HttpErrorResponse) => {
        this.showMessageError = true;
        this.loading = false;
      });
  }

  closeInvalidUserMessage() {
    this.showMessageError = false;
  }
}
