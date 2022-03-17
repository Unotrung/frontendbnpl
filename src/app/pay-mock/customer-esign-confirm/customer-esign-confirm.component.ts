import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EnterOtpComponent} from "../enter-otp/enter-otp.component";
import {AuthService} from "../auth.service";
import {MessageService} from "../message.service";
import {MessageReason} from "../message";
import {ContractService} from "../contract.service";
import {Contract} from "../contract";

@Component({
  selector: 'app-customer-esign-confirm',
  templateUrl: './customer-esign-confirm.component.html',
  styleUrls: ['./customer-esign-confirm.component.scss']
})
export class CustomerEsignConfirmComponent implements OnInit {

  agreeContract = false;
  sendOtpToPhone = false;
  contract: Contract
  expand: boolean = false
  constructor(
      private dialog: MatDialog,
      private authService: AuthService,
      private messageService: MessageService,
      private contractService: ContractService
  ) {
    this.contract = contractService.contract.getValue()
  }

  ngOnInit(): void {

  }

  onAgreeContract (){
    // this.authService.sendOTP().subscribe({
    //   next: data => {
    //     console.log(data)
    //     const dialogRef = this.dialog.open(EnterOtpComponent, { disableClose: true });
    //   },
    //   error: ({error}) => {
    //     console.log(error)
    //     this.messageService.messageData$.next({
    //       messageTitle: 'Thông báo',
    //       message: 'Kết nối mạng lỗi, hãy kiểm tra lại kết nối mạng của bạn',
    //       reason: MessageReason.failOnSentOTP,
    //       closeMessage: 'Đóng'
    //     })
    //   }
    // })
    const dialogRef = this.dialog.open(EnterOtpComponent, { disableClose: true });

  }
}

