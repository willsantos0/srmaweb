import { TrackingService } from './shared/services/tracking.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DeviceComponent } from './device/device.component';
import { DeviceFormComponent } from './device/device-form/device-form.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ModalDialogComponent } from './shared/layout/modal/modal-dialog/modal-dialog.component';
import { ModalConfirmDialogComponent } from './shared/layout/modal/modal-confirm-dialog/modal-confirm-dialog.component';
import { UserComponent } from './user/user.component';

import { AuthenticationService } from './shared/services/authentication.service';
import { DeviceService } from './shared/services/device.service';
import { UserService } from './shared/services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { appRoutes } from './routes';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { TrackingDetailComponent } from './tracking/tracking-detail/tracking-detail.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    DeviceComponent,
    TrackingComponent,
    ModalDialogComponent,
    ModalConfirmDialogComponent,
    UserComponent,
    DeviceFormComponent,
    UserModalComponent,
    UserFormComponent,
    DeviceListComponent,
    TrackingDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyArZuODxi1Tqq-0m1495GC3ZhHGBZYJAEc',
      libraries: ['geometry']
    }),

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    DeviceService,
    UserService,
    TrackingService,
    {
      provide: [HTTP_INTERCEPTORS, AuthHttp],
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions],
      useClass: AuthInterceptor,
      multi: true
    }],
    entryComponents: [
      ModalDialogComponent,
      ModalConfirmDialogComponent,
      UserModalComponent,
      DeviceFormComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
