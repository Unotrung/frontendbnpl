import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthBnplService} from "../auth-bnpl.service";
import {Router} from "@angular/router";
import {Step} from "../step";
import {LoadingService} from "../loading.service";
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input'
import value from "*.json";
import {finalize} from "rxjs";
import {keyPress} from "../helper/helper";
import {InputType} from "../user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    separateDialCode = false;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    PhoneNumberFormat = PhoneNumberFormat;
    preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
    registerForm!: FormGroup;
    submitted = false;
    keyPress = keyPress
    InputType = InputType
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthBnplService,
        private router: Router,
        private loadingService: LoadingService
    ) { }

    //only number will be add
    // keyPress(event: any) {
    //     const pattern = /[0-9]/;
    //     let inputChar = String.fromCharCode(event.charCode);
    //     if (event.keyCode != 8 && !pattern.test(inputChar)) {
    //         event.preventDefault();
    //     }
    // }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            phonenumber: [this.authService.user$.getValue().phone, [ Validators.required,
                Validators.pattern("^0[0-9]*$"),
                Validators.minLength(10), Validators.maxLength(10)]]
        });
        this.f['phonenumber'].valueChanges.subscribe(value => {
            if (value.length > 10) {
                this.f['phonenumber'].setValue(value.slice(0,10))
            }
        })
    }
// convenience getter for easy access to form fields
    get f(): {
        [key: string]: AbstractControl;
    } { return this.registerForm.controls; }

    onRegisterContinue() {
        if (this.f['phonenumber'].invalid){
            this.submitted = true
            return
        }
        //todo: check the phone number, need api here, so we can redirect to the next step
        this.authService.user$.next({...this.authService.user$.getValue(), phone: this.f['phonenumber'].value})
        this.loadingService.loading$.next(true)
        this.authService.checkPossiblePhone(this.authService.user$.getValue().phone!).pipe(
            finalize(()=> {
                this.loadingService.loading$.next(false)
            })
        ).subscribe({
            next: data => {
                //todo: check the redirect condition
                this.router.navigate(['pay-mock/verify-pin']).then()
            },
            error: ({error}) => {
                if (error) {
                    this.authService.registerStep$.next(Step.pictureSelfie);
                    this.router.navigate(['/pay-mock/picture-selfie']).then();
                }
            },
            complete: () => {
            }
        })
        // this.authService.registerStep$.next(Step.pictureSelfie);
        // this.router.navigate(['/pay-mock/picture-selfie']).then();
    }
}
