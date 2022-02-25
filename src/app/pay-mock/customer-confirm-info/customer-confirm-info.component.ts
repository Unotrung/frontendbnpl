import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-customer-confirm-info',
  templateUrl: './customer-confirm-info.component.html',
  styleUrls: ['./customer-confirm-info.component.scss']
})
export class CustomerConfirmInfoComponent implements OnInit {

  constructor(
      public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSendConfirm(){
    const dialogRef = this.dialog.open(CustomerConfirmDialogComponent);
    setTimeout(()=>{
      this.dialog.closeAll();
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
  constructor(private router:Router) { }

  ngOnInit(): void {


  }
}