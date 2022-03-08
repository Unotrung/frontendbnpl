import {Component, OnInit} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-enter-otp',
    templateUrl: './enter-otp.component.html',
    styleUrls: ['./enter-otp.component.scss']
})
export class EnterOtpComponent implements OnInit {
    countdownComplete = false

    constructor(
        private dialogRef: MatDialogRef<EnterOtpComponent>,
        private router: Router,
        private authService: AuthService
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

        this.authService.registerStep$.next(6);
        this.router.navigate(['pay-mock/customer-information-process']).then(
            () => this.dialogRef.close()
        )
    }

    onCountdown(event: any){
        if (event.action === 'done') {
            this.countdownComplete = true;
        }
    }

    onSendOtp(){

    }
}
