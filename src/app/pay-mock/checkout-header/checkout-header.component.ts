import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-checkout-header',
  templateUrl: './checkout-header.component.html',
  styleUrls: ['./checkout-header.component.scss']
})
export class CheckoutHeaderComponent implements OnInit {
  name: string =''
  credit: number = 0
  @Input() smallView: Boolean = false
  constructor(
      private authService: AuthService,
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
