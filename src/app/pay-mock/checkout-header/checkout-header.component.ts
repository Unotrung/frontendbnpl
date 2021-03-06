import {Component, Input, OnInit} from '@angular/core';
import {AuthBnplService} from "../auth-bnpl.service";
import {ItemService} from "../item.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-checkout-header',
  templateUrl: './checkout-header.component.html',
  styleUrls: ['./checkout-header.component.scss']
})
export class CheckoutHeaderComponent implements OnInit {
  name: string =''
  credit: number = 0
  currencyCode = environment.currencyCode
  constructor(
      private authService: AuthBnplService,
      private itemService: ItemService
  ) {
    this.authService.user$.subscribe(({name,creditLimit}) => {
      this.name = name
      this.credit = creditLimit
    })
  }

  ngOnInit(): void {

  }

}
