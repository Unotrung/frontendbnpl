import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageData, MessageReason} from "../message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<MessageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: MessageData,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCloseDialog() {
    if (
        this.data.reason === MessageReason.failOnCheckCitizenIdAndManualEnterId ||
        this.data.reason === MessageReason.failOnCheckSelfieAndImageIdCard
    ) {
      this.router.navigate(['pay-mock/picture-selfie']).then()
    }
    this.dialogRef.close();
  }

}
