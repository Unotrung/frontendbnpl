import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CountdownComponent} from "ngx-countdown";
import {CodeInputComponent} from "angular-code-input";
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {LoadingService} from "../loading.service";
import {Step} from "../step";

@Component({
  selector: 'app-forgot-pin-otp',
  templateUrl: './forgot-pin-otp.component.html',
  styleUrls: ['./forgot-pin-otp.component.scss']
})
export class ForgotPinOtpComponent implements OnInit {

  countdownComplete = false
  otpFails$: BehaviorSubject<number>
  @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;
  @ViewChild('codeInput') codeInput !: CodeInputComponent;
  constructor(
      private router: Router,
      private authService: AuthBnplService,
      private loadingService: LoadingService
  ) {
    this.otpFails$ = new BehaviorSubject<number>(0)
  }

  ngOnInit(): void {
    this.otpFails$.subscribe({
      next: otpFails => {
        if (otpFails >= 5) {
          //todo: API call for register suspend 24 hours
          setTimeout(()=> {
            this.router.navigate(['/pay-mock/start-payment']).then(() => {
              //todo: clear all user info here
            })
          }, 10000)
        }
      },
      error : err => {}
    })
  }
  // this called every time when user changed the code
  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    if (this.countdownComplete) {
      this.otpFails$.next(this.otpFails$.getValue() + 1)
      this.codeInput.reset()
      return
    }
    this.loadingService.loading$.next(true)
    //todo Check if otp code is correct, then
    this.authService.user$.next({...this.authService.user$.getValue(), otp: code})
    console.log(this.authService.user$.getValue())
    this.authService.verifyOTPRequestPin().subscribe({
      next: data => {
        console.log(data)
        this.loadingService.loading$.next(false)
        if (data && data['status']) {
          this.router.navigate(['pay-mock/forgot-pin-pin']).then()
        }
        else {
          this.otpFails$.next(this.otpFails$.getValue() + 1)
          this.codeInput.reset()
        }
      },
      error: ({error}) => {
        this.loadingService.loading$.next(false)
        this.otpFails$.next(this.otpFails$.getValue() + 1)
        this.codeInput.reset()

      },
      complete: () => {

      }
    })
  }

  onCountdown(event: any){
    if (event.action === 'done') {
      this.countdownComplete = true;
    }
  }

  onSendOtp(){
    this.loadingService.loading$.next(true)
    this.authService.sendOTPRequestResetPin().subscribe({
      next: data => {
        this.countdown.restart()
        this.countdownComplete = false
        console.log(data)
      },
      error: ({error}) => {
        this.countdown.restart()
        this.countdownComplete = false
        this.loadingService.loading$.next(false)
      },
      complete: () => {
        this.loadingService.loading$.next(false)
      }

    })
  }
}
