import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-information-process',
  templateUrl: './customer-information-process.component.html',
  styleUrls: ['./customer-information-process.component.scss']
})
export class CustomerInformationProcessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.router.navigate(['/pay-mock/customer-information-finish']).then()
    }, 5000)
  }

}
