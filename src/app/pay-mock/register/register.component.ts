import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Step} from "../step";
import {LoadingService} from "../loading.service";
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input'
import value from "*.json";

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

    phone: FormControl = new FormControl(undefined, [Validators.required])
    registerForm!: FormGroup;
    phoneControl!: FormControl;
    submitted = false;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private loadingService: LoadingService
    ) { }

    //only number will be add
    keyPress(event: any) {
        const pattern = /[0-9]/;
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
        //todo: check the phone number, need api here, so we can redirect to the next step
        this.authService.user$.next({...this.authService.user$.getValue(), phone: this.f['phonenumber'].value})
        this.loadingService.loading$.next(true)
        this.authService.checkPossiblePhone(this.authService.user$.getValue().phone!).subscribe({
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
                this.loadingService.loading$.next(false)
            }
        })
        // this.authService.registerStep$.next(Step.pictureSelfie);
        // this.router.navigate(['/pay-mock/picture-selfie']).then();
    }
}
