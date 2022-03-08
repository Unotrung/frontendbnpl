import { Component, OnInit } from '@angular/core';
import {PriceService} from "../../price.service";
import {Price} from "../../price";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    phoneControl!: FormControl;
    submitted = false;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    //only number will be add
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            phonenumber: ['', [ Validators.required,
                Validators.pattern("^[0-9]*$"),
                Validators.minLength(10), Validators.maxLength(10)]]
        });

    }
// convenience getter for easy access to form fields
    get f(): {
        [key: string]: AbstractControl;
    } { return this.registerForm.controls; }

    onRegisterContinue() {
        //todo: check the phone number, need api here, so we can redirect to the next step
        this.authService.registerStep$.next(1);
        this.router.navigate(['/pay-mock/picture-selfie']).then();
    }
}
