import {Component, OnInit} from '@angular/core';
import {ValidatorService} from "../validator.service";
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {Step} from "../step";
import {LoadingService} from "../loading.service";
import {ProgressStepService} from "../progress-step.service";
import {ItemService} from "../item.service";
import {Item} from "../item";

@Component({
  selector: 'app-customer-pin-install',
  templateUrl: './customer-pin-install.component.html',
  styleUrls: ['./customer-pin-install.component.scss']
})
export class CustomerPinInstallComponent implements OnInit {

  pinCode = '';
  verifyPinCode = '';
  constructor(
      private validatorService: ValidatorService,
      private router: Router,
      private authService: AuthBnplService,
      private loadingService: LoadingService,
      private progressStepService: ProgressStepService,
      private itemService: ItemService
  ) {
    this.progressStepService.step$.next(2)
  }

  ngOnInit(): void {
  }

  // this called every time when user changed the code
  onPinCodeChanged(code: string) {
    this.pinCode = code;
  }

  // this called only if user entered full code
  onPinCodeCompleted(code: string) {

  }

  onVerifyPinCodeChange(code:string) {
    this.verifyPinCode = code;
  }

  onVerifyPinCodeComplete(code: string) {
    console.log(code)
  }

  onFinishPinInstall(){
    this.loadingService.loading$.next(true)
    // this.authService.user$.next({...this.authService.user$.getValue(), password: this.pinCode.toString()})
    this.authService.user$.next({...this.authService.user$.getValue(), pin: this.pinCode})
    this.authService.register().subscribe({
      next: data => {
        console.log(data)

      },
      error: ({error}) => {
        this.loadingService.loading$.next(false)
        console.log(error)
      },
      complete: () => {
        this.authService.updateCustomerInfo().subscribe({
          next :(data) => {
            this.loadingService.loading$.next(false)
            if (data['status']) {
              // @ts-ignore
              this.authService.registerStep$.next(Step.customerEsignConfirm)
              this.router.navigate(['pay-mock/customer-esign-confirm']).then();
            }
            else{
              //up form unsuccessful ->
            }

        },
          error: err => {
            this.loadingService.loading$.next(false)
            // up form error
          },
          complete: ()=> {}
        })
      }
    })

  }
}
