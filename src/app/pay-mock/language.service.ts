import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  langSubject$: BehaviorSubject<string>;
  lang$: Observable<string>;
  constructor() {
    this.langSubject$ = new BehaviorSubject<string>('vi');
    this.lang$ = this.langSubject$.asObservable();
  }
}
