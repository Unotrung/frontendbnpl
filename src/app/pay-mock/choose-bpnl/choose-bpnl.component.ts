import { Component, OnInit } from '@angular/core';
import {BnplPayment} from "./bnpl-payment";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-choose-bpnl',
  templateUrl: './choose-bpnl.component.html',
  styleUrls: ['./choose-bpnl.component.scss']
})
export class ChooseBpnlComponent implements OnInit {
  bnplPayments : BnplPayment[]
  constructor(
      private router: Router,
      private dialogRef: MatDialogRef<ChooseBpnlComponent>
  ) {
    this.bnplPayments = [
      {
        id: "1",
        name: "FE Credit",
        img: "assets/images/fe-credit-logo.png",
        checked: true,
        width: 141,
        height: 27
      },
      {
        id: "2",
        name: "Home Credit",
        img: "assets/images/home-credit-logo.png",
        checked: false,
        width: 141,
        height: 42
      }
    ]
  }

  ngOnInit(): void {
  }

  chooseBNPL() {

    //default and only choose BNPL is FE

    this.router.navigate(['pay-mock/register']).then(
        () => {
          this.dialogRef.close()
        }
    )
  }

}
