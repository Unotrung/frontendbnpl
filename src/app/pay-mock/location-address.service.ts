import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
// @ts-ignore
import * as vietnamLocation from "../../assets/data/local.json" ;

@Injectable({
  providedIn: 'root'
})
export class LocationAddressService {

  constructor(private http: HttpClient) {
  }

  getJSON(): Observable<any> {
    return of(vietnamLocation);
  }
}
