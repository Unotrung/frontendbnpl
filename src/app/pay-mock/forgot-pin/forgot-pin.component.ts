import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.component.html',
  styleUrls: ['./forgot-pin.component.scss']
})
export class ForgotPinComponent implements OnInit {

  phoneFormControl!: FormControl
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.phoneFormControl = new FormControl('', [Validators.required])
  }

  onForgotPinContinue(){

  }

  onForgotPin(){
    this.router.navigate(['pay-mock/forgot-pin']).then();
  }

}
