import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading$: BehaviorSubject<boolean>
  loadingText$: BehaviorSubject<string>
  constructor() {
    this.loading$ = new BehaviorSubject<boolean>(false);
    this.loadingText$ = new BehaviorSubject<string>('');
    this.loading$.subscribe(load => {
      if (load) console.log('loading')
      else {
        console.log('finish loading')
      }
    })
  }
}
