import { Injectable } from '@angular/core';
import {CustomerInformation} from "./customer_infomation";

@Injectable({
  providedIn: 'root'
})
export class CustomerInformationService {

  customerInfo: CustomerInformation

  constructor() {
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

  updateCustomerInfo(customer: CustomerInformation){

  }
}
