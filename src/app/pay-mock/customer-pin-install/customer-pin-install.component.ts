import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-pin-install',
  templateUrl: './customer-pin-install.component.html',
  styleUrls: ['./customer-pin-install.component.scss']
})
export class CustomerPinInstallComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
  }

}
