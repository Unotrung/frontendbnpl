import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
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

