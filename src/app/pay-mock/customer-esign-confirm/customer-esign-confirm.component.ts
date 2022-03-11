import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EnterOtpComponent} from "./enter-opt.component";

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

