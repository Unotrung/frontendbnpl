import { Component, OnInit } from '@angular/core';
import {TenorService} from "../tenor.service";
import {Router} from "@angular/router";
import {AuthBnplService} from "../auth-bnpl.service";
import {LoadingService} from "../loading.service";
import {CheckoutService} from "../checkout.service";
import {MessageService} from "../message.service";
import {MessageReason} from "../message";
import {ItemService} from "../item.service";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {CheckoutConfirmPinComponent} from "../checkout-confirm-pin/checkout-confirm-pin.component";

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.scss']
})
export class CheckoutConfirmComponent implements OnInit {
  saveTenor: Boolean = false
  constructor(
      public tenorService: TenorService,
      private router: Router,
      private authService: AuthBnplService,
      private loadingService: LoadingService,
      private checkoutService: CheckoutService,
      private messageService: MessageService,
      public itemService: ItemService,
      private translate: TranslateService,
      private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onCheckoutConfirm(){
    this.dialog.open(CheckoutConfirmPinComponent, { disableClose: true });
  }
  messagePinNotExact(){
    this.messageService.messageData$.next({
      reason: MessageReason.failOnLoginUsePinCode,
      messageTitle: this.translate.instant('message.announce'),
      message: this.translate.instant('pin.notExact'),
      closeMessage: this.translate.instant('button.back')
    })
    this.messageService.onOpenDialog()
  }

}
