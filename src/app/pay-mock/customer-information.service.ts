import { Injectable } from '@angular/core';
import {CustomerInformation} from "./customer_infomation";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthBnplService} from "./auth-bnpl.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerInformationService {

  customerInfo$: BehaviorSubject<CustomerInformation>

  constructor(
      private http: HttpClient
  ) {
    this.customerInfo$ =  new BehaviorSubject<CustomerInformation>({
      name: undefined,
      sex: undefined,
      phone: undefined,
      birthday: undefined,
      citizenId: undefined,
      issueDate: undefined,

      city: '',
      district: '',
      ward: '',
      street: '',

      personal_title_ref: '',
      name_ref: '',
      phone_ref: ''
    })
  }


  // getCustomerInfo():Observable<any> {
  //
  // }
}
