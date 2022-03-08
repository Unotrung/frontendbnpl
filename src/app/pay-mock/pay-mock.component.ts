import { Component, OnInit } from '@angular/core';
import {LoadingService} from "./loading.service";

@Component({
  selector: 'app-pay-mock',
  templateUrl: './pay-mock.component.html',
  styleUrls: ['./pay-mock.component.scss']
})
export class PayMockComponent implements OnInit {

  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
