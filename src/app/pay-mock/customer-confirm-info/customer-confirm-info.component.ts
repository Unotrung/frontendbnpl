import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
// import {MatDialog} from "@angular/material/dialog";
import {CustomerInformationService} from "../customer-information.service";
import {AuthBnplService} from "../auth-bnpl.service";
import {Step} from "../step";
import {LoadingService} from "../loading.service";
import {LanguageService} from "../language.service";

@Component({
  selector: 'app-customer-confirm-info',
  templateUrl: './customer-confirm-info.component.html',
  styleUrls: ['./customer-confirm-info.component.scss']
})
export class CustomerConfirmInfoComponent implements OnInit {
  address = '';
  lang = '';
  showGender = '';
  showRelationship = '';
  listRelationshipEn = ["Father", "Mother", "Brother", "Sister", "Son", "Daughter",
    "Spouse", "Other family relationship"];
  listRelationshipVi = ["Bố", "Mẹ", "Anh em trai", "Chị em gái", "Con trai", "Con gái",
    "Vợ chồng", "Mối quan hệ khác"]
  constructor(
      // public dialog: MatDialog,
      public customerInformationService: CustomerInformationService,
      private router: Router,
      private authService: AuthBnplService,
      private loadingService: LoadingService,
      private languageService: LanguageService
      ) { }

  ngOnInit(): void {
    this.languageService.lang$.subscribe(x=>{
      this.lang = x;
      this.handleDataShowLanguage(this.lang);
    })
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
  handleDataShowLanguage(lang: string){
    if (lang=='en') {
      if (this.customerInformationService.customerInfo$.getValue().sex == 'Nam') {
        this.showGender = "Male"
      } else {
        this.showGender = 'Female'
      }
      let relTemp = '';
      let listRelationshipEn = ["Father", "Mother", "Brother", "Sister", "Son", "Daughter",
        "Spouse", "Other family relationship"];
      let relValue = this.customerInformationService.customerInfo$.getValue().personal_title_ref;
      this.listRelationshipVi.forEach(function (rel,index) {
        if (relValue == rel ){
          relTemp = listRelationshipEn[index];
          console.log(relTemp);
        }
      })
      this.showRelationship = relTemp;
    } else {
      // @ts-ignore
      this.showGender = this.customerInformationService.customerInfo$.getValue().sex;
      this.showRelationship = this.customerInformationService.customerInfo$.getValue().personal_title_ref
    }
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
