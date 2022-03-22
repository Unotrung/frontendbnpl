import {Component, OnInit, ViewChild} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {Step} from "../step";
import {LoadingService} from "../loading.service";
import {CountdownComponent} from "ngx-countdown";
import {CodeInputComponent} from "angular-code-input";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'app-enter-otp',
    templateUrl: './enter-otp.component.html',
    styleUrls: ['./enter-otp.component.scss']
})
export class EnterOtpComponent implements OnInit {
    countdownComplete = false
    otpFails$: BehaviorSubject<number>
    @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;
    @ViewChild('codeInput') codeInput !: CodeInputComponent;
    constructor(
        private dialogRef: MatDialogRef<EnterOtpComponent>,
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
        //todo Check if otp code is correct, then
        this.authService.user$.next({...this.authService.user$.getValue(), otp: code})
        this.authService.verifyOTP().subscribe({
            next: data => {
                if (data && data['status']) {
                    this.authService.registerStep$.next(Step.customerInformationProcess);
                    this.router.navigate(['pay-mock/customer-information-process']).then(
                        () => this.dialogRef.close()
                    )
                }
            },
            error: ({error}) => {
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
        this.authService.sendOTP().subscribe({
            next: data => {
                this.countdown.restart()
                this.countdownComplete = false
                console.log(data)
            },
            error: ({error}) => {
                this.countdown.restart()
                this.countdownComplete = false
                console.log(error)
                this.loadingService.loading$.next(false)
            },
            complete: () => {
                this.loadingService.loading$.next(false)
            }

        })
    }
}
