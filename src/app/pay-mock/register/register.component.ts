import { Component, OnInit } from '@angular/core';
import {PriceService} from "../../price.service";
import {Price} from "../../price";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  priceObject: Price | undefined
  constructor(private priceService: PriceService) { }

  ngOnInit(): void {
    this.priceObject = this.priceService.getPrice();
  }

}
