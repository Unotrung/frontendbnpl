import { Component, OnInit } from '@angular/core';
import {PictureService} from "../picture.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Step} from "../step";

@Component({
  selector: 'app-citizen-card',
  templateUrl: './citizen-card.component.html',
  styleUrls: ['./citizen-card.component.scss']
})
export class CitizenCardComponent implements OnInit {

    side = 'front'
    instruction: boolean = false

  constructor(
      public pictureService: PictureService,
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {

  }

  onCaptureCitizenCard() {
      if (!this.pictureService.citizenFrontImageComplete$.getValue()) {
        this.pictureService.citizenCardShot('front');
      } else {
        this.pictureService.citizenCardShot('back');
      }
  }

  onDeleteImage(side: string){
      this.pictureService.onCitizenCardComplete(false, side, '');
  }

  onCitizenCardContinue() {
      this.authService.registerStep$.next(Step.customerInformationRegister)
      this.router.navigate(['pay-mock/customer-information-register']).then()
  }

}
