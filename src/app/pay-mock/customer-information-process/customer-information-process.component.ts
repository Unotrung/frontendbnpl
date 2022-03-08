import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Step} from "../step";

@Component({
  selector: 'app-customer-information-process',
  templateUrl: './customer-information-process.component.html',
  styleUrls: ['./customer-information-process.component.scss']
})
export class CustomerInformationProcessComponent implements OnInit {

  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    //todo: make api call check all information
    setTimeout(()=>{
      this.authService.registerStep$.next(Step.customerInformationFinish);
      this.router.navigate(['/pay-mock/customer-information-finish']).then()
    }, 5000)
  }

}
