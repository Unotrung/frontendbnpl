import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-start-payment',
  templateUrl: './start-payment.component.html',
  styleUrls: ['./start-payment.component.scss']
})
export class StartPaymentComponent implements OnInit {

  constructor(
      private router: Router,
      public itemService: ItemService
  ) { }

  ngOnInit(): void {
  }
}
