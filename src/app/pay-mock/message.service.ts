import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MessageData, MessageReason} from "./message";
import {BehaviorSubject} from "rxjs";
import {MessageComponent} from "./message/message.component";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageData$: BehaviorSubject<MessageData>
  constructor(
      private dialog: MatDialog,
      private translate: TranslateService
  ) {
    this.messageData$ = new BehaviorSubject<MessageData>({
      reason: MessageReason.failBackIdScreenShot,
      messageTitle: '',
      message: '',
      closeMessage: ''
    })
  }

  onOpenDialog(){
    const dialogRef = this.dialog.open(MessageComponent, {
      data: this.messageData$.getValue(),
      disableClose: true,
      panelClass: 'message-box-wrapper'
    })
  }

  messageDialog(reason: MessageReason) {
    if (reason === MessageReason.failOnCheckSelfieAndImageIdCard) {
      this.messageData$.next({
        reason: MessageReason.failOnCheckSelfieAndImageIdCard,
        messageTitle:  `${this.translate.stream('message.announce')}`,
        message:  `${this.translate.instant('message.selfieAndNCardFrontNotMatch')}`,
        closeMessage:  `Chụp lại ${this.translate.instant('button.reshot')}`,
      })
    }
    if (reason === MessageReason.failOnCheckCitizenIdAndManualEnterId) {
      this.messageData$.next({
        reason: MessageReason.failOnCheckCitizenIdAndManualEnterId,
        messageTitle:  `${this.translate.instant('message.announce')}`,
        message:  `${this.translate.instant('message.manualNidAndNCardFrontNotMatch')}`,
        closeMessage:  `${this.translate.instant('button.reEnterNid')}`
      })
    }
    if (reason === MessageReason.failFrontIdScreenShot) {
      this.messageData$.next({
        reason: MessageReason.failFrontIdScreenShot,
        messageTitle:  `${this.translate.instant('message.announce')}`,
        message:  `${this.translate.instant('message.NCardFrontError')}`,
        closeMessage:  `${this.translate.instant('button.reshot')}`
      })
    }
    if (reason === MessageReason.failBackIdScreenShot) {
      this.messageData$.next({
        reason: MessageReason.failBackIdScreenShot,
        messageTitle: `${this.translate.instant('message.announce')}`,
        message:  `${this.translate.instant('message.NCardBackError')}`,
        closeMessage:  `${this.translate.instant('button.reshot')}`
      })
    }
    if (reason === MessageReason.failSelfieScreenShot) {
      this.messageData$.next({
        reason: MessageReason.failSelfieScreenShot,
        message:  `${this.translate.instant('message.selfieError')}`,
        messageTitle:  `${this.translate.instant('message.announce')}`,
        closeMessage:  `${this.translate.instant('button.reshot')}`
      })
    }
    if (reason === MessageReason.failOnHVTokenExpired) {
      this.messageData$.next(({
        reason: MessageReason.failOnHVTokenExpired,
        messageTitle: this.translate.instant('message.announce'),
        message: this.translate.instant('message.tokenExpired'),
        closeMessage: this.translate.instant('button.reRegister')
      }))
    }

    this.onOpenDialog()
  }

}
