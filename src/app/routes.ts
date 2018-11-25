import { DeviceComponent } from './device/device.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path : '', redirectTo: 'home', pathMatch : 'full', canActivate: [ AuthGuard ] },
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'device', component: DeviceComponent, canActivate: [ AuthGuard ] }
];
