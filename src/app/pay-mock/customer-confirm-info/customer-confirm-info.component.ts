import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
// import {MatDialog} from "@angular/material/dialog";
import {CustomerInformationService} from "../customer-information.service";
import {AuthBnplService} from "../auth-bnpl.service";
import {Step} from "../step";
import {LoadingService} from "../loading.service";

@Component({
  selector: 'app-customer-confirm-info',
  templateUrl: './customer-confirm-info.component.html',
  styleUrls: ['./customer-confirm-info.component.scss']
})
export class CustomerConfirmInfoComponent implements OnInit {
  address = '';
  constructor(
      // public dialog: MatDialog,
      public customerInformationService: CustomerInformationService,
      private router: Router,
      private authService: AuthBnplService,
      private loadingService: LoadingService
      ) { }

  ngOnInit(): void {
    this.address = `${this.customerInformationService.customerInfo$.getValue().street}, 
    ${this.customerInformationService.customerInfo$.getValue().ward}, 
    ${this.customerInformationService.customerInfo$.getValue().district}, 
    ${this.customerInformationService.customerInfo$.getValue().city}`
  }

  onSendConfirm(){
    // const dialogRef = this.dialog.open(CustomerConfirmDialogComponent);
    this.loadingService.loading$.next(true)

    setTimeout(()=>{
      // this.dialog.closeAll();
      this.authService.registerStep$.next(Step.customerPinInstall);
      this.router.navigate(['pay-mock/customer-pin-install']).then(()=>{
        this.loadingService.loading$.next(false)
      })
    }, 3000)

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

}


// @Component({
//   selector: 'app-customer-confirm-dialog',
//   templateUrl: './customer-confirm-dialog.component.html',
// })
// export class CustomerConfirmDialogComponent implements OnInit {
//   address: string = '';
//   constructor(
//       private router:Router
//   ) { }
//
//   ngOnInit(): void {
//   }
// }
