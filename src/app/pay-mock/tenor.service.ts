import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {Tenor} from "./tenor";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TenorService {

  tenors$ : BehaviorSubject<Tenor[]>
  selectedTenor$: BehaviorSubject<Tenor | null>
  constructor(
      private http: HttpClient,
  ) {
    this.tenors$ = new BehaviorSubject<Tenor[]>([
      {
        tenorId: '1',
        convertFee: 0,
        paymentSchedule: 0
      }
    ])
    this.selectedTenor$ = new BehaviorSubject<Tenor | null>(null)
    this.getTenor().subscribe({next: data => {
      if (data['status']) {
        let tenors : any = []
        data['data'].forEach((tenor: any) => {
          tenors.push({
            tenorId: tenor._id,
            convertFee: tenor.convertFee,
            paymentSchedule: tenor.paymentSchedule,
            enable: true
          })
        } )
        this.updateTenorList(tenors)
        // this.selectedTenor$.next(this.tenors$.getValue()[0])
      }
    }})
  }
  getTenor(){
    const uri = `${environment.localAPIServer}v1/bnpl/common/getAllTenor`
    return this.http.get<any>(encodeURI(uri))
  }

  updateTenorList(tenors: Tenor[]){
    console.log('tenors', tenors)
    this.tenors$.next(tenors)
  }

}
