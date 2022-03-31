import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProgressStep} from "./progress-step";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ProgressStepService {
  step$: BehaviorSubject<number>
  progressSteps$ : BehaviorSubject<ProgressStep[]>
  constructor(
      private translate: TranslateService
  ) {
    this.step$ = new BehaviorSubject<number>(1)
    this.progressSteps$ = new BehaviorSubject<ProgressStep[]>([
      {id:1,title: this.translate.instant('step.customerInfo')},
      {id:2,title: this.translate.instant('step.pinInstall')},
      {id:3,title: this.translate.instant('step.eSign')},
      {id:4,title: this.translate.instant('step.infoCheck')},
      {id:5,title: this.translate.instant('step.finish')},
    ])
  }
  resetStep(){
    this.step$.next(1)
  }
}
