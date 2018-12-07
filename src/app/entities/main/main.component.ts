import { Component, OnInit } from '@angular/core';
import {AppRoutingService} from "../../common/services/routing.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public routingService: AppRoutingService) { }

  ngOnInit() {
  }

  routeToEntity(entity) {
    this.routingService.routeToEntity(entity)
  }

}
