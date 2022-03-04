import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-esign-confirm',
  templateUrl: './customer-esign-confirm.component.html',
  styleUrls: ['./customer-esign-confirm.component.scss']
})
export class CustomerEsignConfirmComponent implements OnInit {

  agreeContract = false;
  sendOtpToPhone = false;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  onAgreeContract (){
    const dialogRef = this.dialog.open(EnterOtpComponent, { disableClose: true });
  }
}

@Component({
  selector: 'app-enter-otp',
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.scss']
})
export class EnterOtpComponent implements OnInit {
  countdownComplete = false

  constructor(
      private dialogRef: MatDialogRef<EnterOtpComponent>,
      private router: Router
      ) {
  }

  ngOnInit(): void {
  }
  // this called every time when user changed the code
  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
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
