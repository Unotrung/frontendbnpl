import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Observable, of} from "rxjs";
import {Price} from "./price";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb(): {} | Observable<{}> | Promise<{}> {
    const price: Price = {
      cartPrice: 5000000,
      shipFee: 30000
    }
    return {price}
  }

}
