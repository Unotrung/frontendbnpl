import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthBnplService} from "../auth-bnpl.service";
import {Router} from "@angular/router";
import {LoadingService} from "../loading.service";

@Component({
  selector: 'app-forgot-pin-card-id',
  templateUrl: './forgot-pin-card-id.component.html',
  styleUrls: ['./forgot-pin-card-id.component.scss']
})
export class ForgotPinCardIdComponent implements OnInit {
  cardIdForm!: FormControl
  constructor(
      private authService: AuthBnplService,
      private router: Router,
      private loadingService: LoadingService
  ) { }

  ngOnInit(): void {

    if (!this.authService.user$.getValue().phone) {
      this.router.navigate(['pay-mock/register']).then()
    }
    this.cardIdForm = new FormControl(this.authService.user$.getValue().citizenId, [Validators.pattern(/\b\d{9}\b|\b\d{12}\b/g),Validators.required])
  }

  onForgotCardIdContinue() {
    console.log(this.cardIdForm.invalid)
    if (this.cardIdForm.invalid) return
    //todo: check design here
    this.loadingService.loading$.next(true)
    this.authService.user$.next({...this.authService.user$.getValue(), citizenId: this.cardIdForm.value})
    this.authService.sendOTPRequestResetPin().subscribe({
      next: data => {
        this.loadingService.loading$.next(false)
        if (data && data['status']) {
          console.log(data)
          this.router.navigate(['pay-mock/forgot-pin-otp']).then(
              () => {
                // this.authService.user$.next({...this.authService.user$.getValue(), citizenId: ''})
              }
          )
        }
      },
      error: err => {
        this.loadingService.loading$.next(false)
        //todo : network message error here
        console.log(err)
      }
    })

  }

}
