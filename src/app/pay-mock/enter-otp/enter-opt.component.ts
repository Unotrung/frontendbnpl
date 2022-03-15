import {Component, OnInit, ViewChild} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Step} from "../step";
import {LoadingService} from "../loading.service";
import {CountdownComponent} from "ngx-countdown";

@Component({
    selector: 'app-enter-otp',
    templateUrl: './enter-otp.component.html',
    styleUrls: ['./enter-otp.component.scss']
})
export class EnterOtpComponent implements OnInit {
    countdownComplete = false
    otpFails = 0
    @ViewChild('cd', { static: false }) private countdown!: CountdownComponent;
    constructor(
        private dialogRef: MatDialogRef<EnterOtpComponent>,
        private router: Router,
        private authService: AuthService,
        private loadingService: LoadingService
    ) {
    }

    ngOnInit(): void {
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
                this.otpFails ++
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
