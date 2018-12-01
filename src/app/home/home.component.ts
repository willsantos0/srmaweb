import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../shared/services/tracking.service';
import { Tracking } from '../shared/models/tracking.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listTrackings: Tracking[];

  constructor() { }

  ngOnInit() {
  }

}
