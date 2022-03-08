import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CustomerInformationService} from "../customer-information.service";
import {AuthService} from "../auth.service";
import {Step} from "../step";

@Component({
  selector: 'app-customer-confirm-info',
  templateUrl: './customer-confirm-info.component.html',
  styleUrls: ['./customer-confirm-info.component.scss']
})
export class CustomerConfirmInfoComponent implements OnInit {
  address = '';
  constructor(
      public dialog: MatDialog,
      public customerInformationService: CustomerInformationService,
      private router: Router,
      private authService: AuthService
      ) { }

  ngOnInit(): void {
    this.address = `${this.customerInformationService.customerInfo.street}, 
    ${this.customerInformationService.customerInfo.ward}, 
    ${this.customerInformationService.customerInfo.district}, 
    ${this.customerInformationService.customerInfo.city}`
  }

  onSendConfirm(){
    const dialogRef = this.dialog.open(CustomerConfirmDialogComponent);
    setTimeout(()=>{
      this.dialog.closeAll();
      this.authService.registerStep$.next(Step.customerPinInstall);
      this.router.navigate(['pay-mock/customer-pin-install']).then()
    }, 3000)

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}


@Component({
  selector: 'app-customer-confirm-dialog',
  templateUrl: './customer-confirm-dialog.component.html',
})
export class CustomerConfirmDialogComponent implements OnInit {
  address: string = '';
  constructor(
      private router:Router
  ) { }

  ngOnInit(): void {
  }
}