import { Injectable } from '@angular/core';
import {CustomerInformation} from "./customer_infomation";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerInformationService {

  customerInfo: CustomerInformation

  constructor(
      private http: HttpClient
  ) {
    this.customerInfo = {
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
    }
  }


  // getCustomerInfo():Observable<any> {
  //
  // }
}
