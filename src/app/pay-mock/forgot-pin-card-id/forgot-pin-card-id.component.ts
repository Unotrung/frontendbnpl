import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthBnplService} from "../auth-bnpl.service";
import {Router} from "@angular/router";
import {LoadingService} from "../loading.service";
import {MessageService} from "../message.service";

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
      private loadingService: LoadingService,
      private messageService: MessageService
  ) { }

  ngOnInit(): void {

    if (!this.authService.user$.getValue().phone) {
      this.router.navigate(['pay-mock/register']).then()
    }
    this.cardIdForm = new FormControl(this.authService.user$.getValue().citizenId, {validators: [Validators.pattern(/\b\d{9}\b|\b\d{12}\b/g),Validators.required], updateOn: 'blur'})
    this.cardIdForm.valueChanges.subscribe({
      next: (value => {
        console.log(value)
        if (this.cardIdForm.invalid) return
        this.loadingService.loading$.next(true)
        this.authService.checkNidPhoneMatch(value).subscribe({
          next: (data) => {
            this.loadingService.loading$.next(false)
            console.log(data)
            if (data && data['status']) {
              this.cardIdForm.setErrors(null)
            } else {
              this.cardIdForm.setErrors({'wrongnid': true})
            }
          },
          error: err => {
            this.loadingService.loading$.next(false)
          }
        })
      })
    })
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
        else {

        }
      },
      error: err => {
        this.loadingService.loading$.next(false)
        //todo : network message error here
        console.log(err)
      }
    })

  }
  messageNidNotExact(){

  }

}
