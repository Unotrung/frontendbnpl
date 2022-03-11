import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageData} from "../message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<MessageComponent>,
      @Inject(MAT_DIALOG_DATA) public data: MessageData
  ) { }

  ngOnInit(): void {
  }

  onCloseDialog() {

    this.dialogRef.close();
  }

}
