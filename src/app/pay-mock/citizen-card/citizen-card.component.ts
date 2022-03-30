import {Component, OnInit} from '@angular/core';
import {NCardSide, PictureService} from "../picture.service";
import {AuthBnplService} from "../auth-bnpl.service";
import {Router} from "@angular/router";
import {Step} from "../step";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-citizen-card',
  templateUrl: './citizen-card.component.html',
  styleUrls: ['./citizen-card.component.scss']
})
export class CitizenCardComponent implements OnInit {

    side = NCardSide.front
    instruction: boolean = false
    NCardSide = NCardSide

  constructor(
      public pictureService: PictureService,
      private authService: AuthBnplService,
      private router: Router,
      private translate: TranslateService
  ) { }

  ngOnInit(): void {

  }

  onCaptureCitizenCard() {
      if (!this.pictureService.citizenFrontImageComplete$.getValue()) {
        this.pictureService.citizenCardShot(NCardSide.front);
      } else {
        this.pictureService.citizenCardShot(NCardSide.back);
      }
  }

  onDeleteImage(side: NCardSide){
      this.pictureService.deleteImage(side)
  }

  onCitizenCardContinue() {
      this.authService.registerStep$.next(Step.customerInformationRegister)
      this.router.navigate(['pay-mock/customer-information-register']).then()
  }

  getTextSideLocalize(side: NCardSide): string {
        if (side === NCardSide.front) {
            if (this.pictureService.citizenFrontImageComplete$.getValue()){
                return ''
            }
            else {
                return  `mặt trước${this.translate.stream('nCard.front')}${this.pictureService.citizenBackImageComplete$.getValue()? '':'/'}`
            }
        }

        if (this.pictureService.citizenBackImageComplete$.getValue()) {
            return ''
        }
        else {
            return `mặt sau${this.translate.stream('nCard.front')}`
        }

  }

}
