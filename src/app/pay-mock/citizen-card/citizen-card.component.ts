import { Component, OnInit } from '@angular/core';
import {PictureService} from "../picture.service";

@Component({
  selector: 'app-citizen-card',
  templateUrl: './citizen-card.component.html',
  styleUrls: ['./citizen-card.component.scss']
})
export class CitizenCardComponent implements OnInit {

  side = 'front'
  constructor(
      public pictureService: PictureService
  ) { }

  ngOnInit(): void {

  }

  onCaptureCitizenCard() {
      if (!this.pictureService.citizenFrontImageComplete) {
        this.pictureService.citizenCardShot('front');
      } else {
        this.pictureService.citizenCardShot('back');
      }
  }

  onDeleteImage(side: string){
      this.pictureService.onCitizenCardComplete(false, side, '');
  }

}
