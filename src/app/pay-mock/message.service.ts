import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MessageData, MessageReason} from "./message";
import {BehaviorSubject} from "rxjs";
import {MessageComponent} from "./message/message.component";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageData$: BehaviorSubject<MessageData>
  constructor(
      private dialog: MatDialog
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


}
