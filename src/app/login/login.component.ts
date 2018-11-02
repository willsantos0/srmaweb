import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
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
    private formBuilder: FormBuilder) { }

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

    if (this.loginForm.value.username === 'teste123' && this.loginForm.value.password === 'teste123') {
      this.router.navigate(['/home']);
    } else {
      this.showMessageError = true;
      this.loading = false;
    }
  }

  closeInvalidUserMessage() {
    this.showMessageError = false;
  }
}
