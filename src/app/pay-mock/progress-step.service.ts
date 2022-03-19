import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProgressStep} from "./progress-step";

@Injectable({
  providedIn: 'root'
})
export class ProgressStepService {
  step$: BehaviorSubject<number>
  progressSteps$ : BehaviorSubject<ProgressStep[]>
  constructor() {
    this.step$ = new BehaviorSubject<number>(1)
    this.progressSteps$ = new BehaviorSubject<ProgressStep[]>([
      {id:1,title:'Thông tin khách hàng'},
      {id:2,title:'Cài đặt Pin'},
      {id:3,title:'E-Sign'},
      {id:4,title:'Xác minh thông tin'},
      {id:5,title:'Hoàn thành'},
    ])
  }
}
