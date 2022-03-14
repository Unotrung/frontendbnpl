import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Tenor} from "./tenor";

@Injectable({
  providedIn: 'root'
})
export class TenorService {
  selectedTenor$: BehaviorSubject<Tenor | null>
  constructor() {
    this.selectedTenor$ = new BehaviorSubject<Tenor | null>(null)
  }
}
