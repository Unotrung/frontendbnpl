import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {AuthBnplService} from "../auth-bnpl.service";
import {Router} from "@angular/router";
import {Step} from "../step";
import {LoadingService} from "../loading.service";
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input'
import {catchError, finalize, firstValueFrom, map, Observable, of} from "rxjs";
import {keyPress} from "../helper/helper";
import {InputType} from "../user";
import {PictureService} from "../picture.service";
import {ProgressStepService} from "../progress-step.service";
import {ItemService} from "../item.service";
import {StepRegisterRestore} from "../step-register-restore";
import {HttpError} from "../http-error";

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
    blockPhones : string[] = []
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthBnplService,
        private router: Router,
        private loadingService: LoadingService,
        private pictureService: PictureService,
        private stepService: ProgressStepService,
        public itemService: ItemService
    ) { }

    ngOnInit() {
        this.clearOldData()
        this.registerForm = this.formBuilder.group({
            phonenumber: ['',{
                validators: [ Validators.required, Validators.pattern(/^(09|03|07|08|05)+([0-9]{8}$)/g), Validators.minLength(10), Validators.maxLength(10),
                // this.validatorBlockPhone()
                ],
                asyncValidators: [this.validatorBlockPhone.bind(this)],
                updateOn: 'blur' } ]
        });
        this.f['phonenumber'].valueChanges.subscribe(value => {
            if (value.length > 10) {
                this.f['phonenumber'].setValue(value.slice(0,10))
            }
        })
        if (this.pictureService.initPictureService$.getValue() && !this.pictureService.hvInit$.getValue()) {
            this.pictureService.initHVToken()
        }
    }
// convenience getter for easy access to form fields
    get f(): {
        [key: string]: AbstractControl;
    } {
        return this.registerForm.controls; }

    onRegisterContinue() {
        this.authService.user$.next({...this.authService.user$.getValue(), phone: this.f['phonenumber'].value})
        this.loadingService.loading$.next(true)
        this.authService.checkPossiblePhone(this.authService.user$.getValue().phone!).pipe(
            finalize(()=> {
                this.loadingService.loading$.next(false)
            })
        ).subscribe({
            next: data => {
                    this.router.navigate(['pay-mock/verify-pin']).then()
            },
            error: (error) => {
                console.log(error)
                this.authService.registerStep$.next(Step.pictureSelfie);
                this.router.navigate(['/pay-mock/picture-selfie']).then();
            },
            complete: () => {
            }
        })
    }

    clearOldData() {
        this.authService.logout()
        this.pictureService.clearData()
        this.stepService.resetStep()
    }

    async validatorBlockPhone(control: AbstractControl): Promise<ValidationErrors | null> {
        this.loadingService.loading$.next(true)
        try {
            await firstValueFrom(this.authService.checkPossiblePhone(control.value))
            this.loadingService.loading$.next(false)
            return null
        } catch (error: any) {
            this.loadingService.loading$.next(false)
            if (error.status === HttpError.notAllow){
                return {'blockPhone': true}
            }
            return null
        }
    }
}
