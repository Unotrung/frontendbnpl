import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Price} from "./price";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(
  ) { }
  getPrice(): Price {
    return {
      cartPrice: 5000000,
      shipFee: 30000
    }
  }
}
