import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Tenor} from "./tenor";

@Injectable({
  providedIn: 'root'
})
export class TenorService {

  tenors$ : BehaviorSubject<Tenor[]>
  selectedTenor$: BehaviorSubject<Tenor | null>
  constructor() {
    this.tenors$ = new BehaviorSubject<Tenor[]>([
      {
        tenorId: '1',
        itemPrice: 5000000,
        convertFee: 1000000,
        paymentSchedule: 120
      },
      {
        tenorId: '2',
        itemPrice: 5000000,
        convertFee: 800000,
        paymentSchedule: 240
      },
      {
        tenorId: '3',
        itemPrice: 5000000,
        convertFee: 500000,
        paymentSchedule: 120
      }
    ])
    this.selectedTenor$ = new BehaviorSubject<Tenor | null>(null)
  }
}
