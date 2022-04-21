import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {ItemService} from "../item.service";
import {PaymentMethod} from "./payment-method";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {ChooseBpnlComponent} from "../choose-bpnl/choose-bpnl.component";

@Component({
  selector: 'app-start-payment',
  templateUrl: './start-payment.component.html',
  styleUrls: ['./start-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartPaymentComponent implements OnInit {
  paymentMethods: PaymentMethod[]
  chooseBNPL= false
  constructor(
      private router: Router,
      public itemService: ItemService,
      private translate: TranslateService,
      private dialog: MatDialog
  ) {
    this.paymentMethods = [
      {
        id: '1',
        name: this.translate.instant('voolo.grab'),
        img: 'assets/images/grab-logo.png',
        width: 48,
        height: 20
      },
      {
        id: '2',
        name: this.translate.instant('voolo.atm'),
        img: 'assets/images/atm-logo.png',
        width: 29,
        height: 19
      },
      {
        id: '3',
        name: this.translate.instant('voolo.creditCard'),
        img: 'assets/images/credit-card-logo.png',
        width: 29,
        height: 29
      }
    ]
  }

  ngOnInit(): void {
  }
  change(event: any) {
    console.log(event)
  }

  chooseBNPLMethod() {
    // if (!this.chooseBNPL) {
    //   return
    // }
    const dialogRef = this.dialog.open(ChooseBpnlComponent)
  }
}
