import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output, SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {CodeInputComponent} from "angular-code-input";

@Component({
  selector: 'app-verify-pin-child',
  templateUrl: './verify-pin-child.component.html',
  styleUrls: ['./verify-pin-child.component.scss']
})
export class VerifyPinChildComponent implements OnInit, OnChanges {

  @ViewChild('codeInput') codeInput! : CodeInputComponent

  @Output() pinCode = new EventEmitter<string>()
  @Input() popUp = false
  @Input() pinFails = 0
  pinDirty = false
  pin = ''
  enterNewPin = true

  constructor(
      @Optional() private dialogRef: MatDialogRef<VerifyPinChildComponent>,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.enterNewPin = true
    this.pin = code
    this.pinCode.emit(code)
    if (!this.pinDirty) {
      this.pinDirty = true
    }
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
  }

  resetCode(){
    this.codeInput.reset()
  }

  onForgotPin(){
    this.router.navigate(['pay-mock/forgot-pin-phone']).then(()=> {
      if (this.popUp) {
        console.log('close popup')
        this.dialogRef.close()
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pinFails']?.currentValue > 0) {
      this.enterNewPin = false
    }
  }

  // onVerifyPinContinue() {
  //   //todo: check pin code is correct here and navigate to checkout
  //
  //   this.router.navigate(['pay-mock/checkout']).then()
  // }

}
