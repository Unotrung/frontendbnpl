import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EnterOtpComponent} from "../enter-otp/enter-otp.component";
import {AuthBnplService} from "../auth-bnpl.service";
import {MessageService} from "../message.service";
import {MessageReason} from "../message";
import {ContractService} from "../contract.service";
import {Contract} from "../contract";
import {LoadingService} from "../loading.service";
import {ProgressStepService} from "../progress-step.service";

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
      private authService: AuthBnplService,
      private messageService: MessageService,
      private contractService: ContractService,
      private loadingService: LoadingService,
      private progressStepService: ProgressStepService
  ) {
    this.contract = contractService.contract.getValue()
    this.progressStepService.step$.next(3)
  }

  ngOnInit(): void {

  }

  onAgreeContract (){
    this.loadingService.loading$.next(true)
    this.authService.sendOTP().subscribe({
      next: data => {
        console.log(data)
        this.loadingService.loading$.next(false)
        const dialogRef = this.dialog.open(EnterOtpComponent, { disableClose: true });
      },
      error: ({error}) => {
        console.log(error)
        this.loadingService.loading$.next(false)
        this.messageService.messageData$.next({
          messageTitle: 'Thông báo',
          message: 'Kết nối mạng lỗi, hãy kiểm tra lại kết nối mạng của bạn',
          reason: MessageReason.failOnSentOTP,
          closeMessage: 'Đóng'
        })
      }
    })

  }
}

