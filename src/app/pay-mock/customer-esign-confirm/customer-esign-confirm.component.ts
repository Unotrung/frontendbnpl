import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-esign-confirm',
  templateUrl: './customer-esign-confirm.component.html',
  styleUrls: ['./customer-esign-confirm.component.scss']
})
export class CustomerEsignConfirmComponent implements OnInit {

  agreeContract = true;
  sendOtpToPhone = false;
  constructor() { }

  ngOnInit(): void {
  }

}
