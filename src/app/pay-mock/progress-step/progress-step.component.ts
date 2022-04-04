import {Component, Input, OnInit} from '@angular/core';
import {ProgressStep} from "../progress-step";
import {ProgressStepService} from "../progress-step.service";

@Component({
  selector: 'app-progress-step',
  templateUrl: './progress-step.component.html',
  styleUrls: ['./progress-step.component.scss']
})
export class ProgressStepComponent implements OnInit {

  // progressSteps: ProgressStep[]
  // currentStep: number

  constructor(
      public progressStepService: ProgressStepService
  ) {
    // this.progressSteps = this.progressStepService.progressSteps$.getValue()
    // this.currentStep = this.progressStepService.step$.getValue()
  }

  ngOnInit(): void {
  }

}
