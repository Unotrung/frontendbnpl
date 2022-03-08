import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-customer-information-finish',
  templateUrl: './customer-information-finish.component.html',
  styleUrls: ['./customer-information-finish.component.scss']
})
export class CustomerInformationFinishComponent implements OnInit {

  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onInfoFinish(){
    this.authService.registerStep$.next(8);
    this.router.navigate(['pay-mock/checkout']).then();
  }

}
