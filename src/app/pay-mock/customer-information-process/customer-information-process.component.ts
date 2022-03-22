import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {Step} from "../step";
import {BehaviorSubject, timer} from "rxjs";
import {ProgressStepService} from "../progress-step.service";

@Component({
  selector: 'app-customer-information-process',
  templateUrl: './customer-information-process.component.html',
  styleUrls: ['./customer-information-process.component.scss']
})
export class CustomerInformationProcessComponent implements OnInit {
  progress$: BehaviorSubject<number>
  constructor(
      private router: Router,
      private authService: AuthBnplService,
      private progressStepService: ProgressStepService
  ) {
    this.progress$ = new BehaviorSubject<number>(0)
    this.progressStepService.step$.next(4)
  }

  ngOnInit(): void {
    timer(0, 1000).subscribe(counter => {
      if (counter <= 10) {
        this.progress$.next(counter*10)
      }
    })
    this.progress$.subscribe(progress => {
      if (progress === 100) {
        this.authService.registerStep$.next(Step.checkout)
        this.progressStepService.step$.next(5)
        this.router.navigate(['pay-mock/checkout']).then()
      }
    })
  }

}
