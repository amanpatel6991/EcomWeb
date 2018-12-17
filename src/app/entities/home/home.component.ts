import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from "../../common/services/routing.service";
import {CommonService} from "../../common/services/common.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedImgIndex = 1;

  imgSliderArray = [
    {index: 1, image: '../../../assets/icons/sample-1.jpg', alt: '', text: 'image 1'},
    {index: 2, image: '../../../assets/icons/sample-2.jpg', alt: '', text: 'image 2'},
  ];

  constructor(public routingService: AppRoutingService, public commonService: CommonService) {
  }

  ngOnInit() {
    // console.log("in home ::",this.commonService.signedIn.getValue());
    // if (this.commonService.signedIn.getValue()) {
    //   this.routingService.routeToEntity("userDashboard")
    // }
  }

  onLeftNavigate() {
    if (this.selectedImgIndex >= 2) {
      this.selectedImgIndex = this.selectedImgIndex - 1;
    } else {
      this.selectedImgIndex = this.imgSliderArray.length;
    }
  }

  onRightNavigate() {
    if (this.selectedImgIndex < this.imgSliderArray.length) {
      this.selectedImgIndex = this.selectedImgIndex + 1;
    } else {
      this.selectedImgIndex = 1;
    }
  }

}
