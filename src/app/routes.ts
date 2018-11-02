import { DeviceComponent } from './device/device.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TrackingComponent } from './tracking/tracking.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path : '', redirectTo: 'login', pathMatch : 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'tracking', component: TrackingComponent }
];
