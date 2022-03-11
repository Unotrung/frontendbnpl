import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-pin-card-id',
  templateUrl: './forgot-pin-card-id.component.html',
  styleUrls: ['./forgot-pin-card-id.component.scss']
})
export class ForgotPinCardIdComponent implements OnInit {
  cardIdForm!: FormControl
  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.cardIdForm = new FormControl(this.authService.user$.getValue().citizenId, [Validators.pattern(/\b\d{9}\b|\b\d{12}\b/g),Validators.required])
  }

  onForgotCardIdContinue() {
    //todo: check design here

    this.authService.user$.next({...this.authService.user$.getValue(), citizenId: this.cardIdForm.value})
  }

}
