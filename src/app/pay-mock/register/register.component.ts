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
import {TranslateService} from "@ngx-translate/core";

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
    submitted = false;
    errorPhoneBlock = '';
    keyPress = keyPress
    InputType = InputType
    blockPhones : string[] = []

    registerForm: FormGroup = new FormGroup({
        phoneNumber: new FormControl("", [Validators.required,
            Validators.pattern("(09|03|08|07|05)[0-9]{8}")
        ])
    });

    invalidMessage = [
        {type: "required", message: this.translateService.instant('phone.empty')},
        {type: "pattern", message: this.translateService.instant('phone.wrongFormat')},
    ]


    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthBnplService,
        private router: Router,
        private loadingService: LoadingService,
        private pictureService: PictureService,
        private stepService: ProgressStepService,
        public itemService: ItemService,
        private translateService: TranslateService
    ) { }

    ngOnInit() {
        this.clearOldData();
        console.log("check",this.registerForm.invalid);
        // this.registerForm = this.formBuilder.group({
        //     phonenumber: ['',{
        //         validators: [ Validators.required, Validators.pattern(/^(09|03|07|08|05)+([0-9]{8}$)/), Validators.minLength(10), Validators.maxLength(10),
        //         // this.validatorBlockPhone()
        //         ],
        //         asyncValidators: [this.validatorBlockPhone.bind(this)],
        //         updateOn: 'blur' } ]
        // });
        // this.f['phonenumber'].valueChanges.subscribe(value => {
        //     if (value.length > 10) {
        //         this.f['phonenumber'].setValue(value.slice(0,10))
        //     }
        // })
        if (this.pictureService.initPictureService$.getValue() && !this.pictureService.hvInit$.getValue()) {
            this.pictureService.initHVToken()
        }
    }

    get f(){
        return this.registerForm.controls;
    }
// convenience getter for easy access to form fields
//     get f(): {
//         [key: string]: AbstractControl;
//     } {
//         return this.registerForm.controls;
//     }

    submit() {
        this.authService.user$.next({...this.authService.user$.getValue(), phone: this.f['phoneNumber'].value})
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
                if (error.error.errCode === 1004) {
                    this.errorPhoneBlock = this.translateService.instant("phone.block");
                    return;
                }
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

    resetMessage(){
        this.errorPhoneBlock = '';
    }

    // async validatorBlockPhone(control: AbstractControl): Promise<ValidationErrors | null> {
    //     this.loadingService.loading$.next(true)
    //     try {
    //         const data = await firstValueFrom(this.authService.checkPossiblePhone(control.value))
    //         console.log(data)
    //         this.loadingService.loading$.next(false)
    //         return null
    //     } catch (error: any) {
    //         this.loadingService.loading$.next(false)
    //         console.log(error)
    //         if (error.status === HttpError.notAllow){
    //             return {'blockPhone': true}
    //         }
    //         return null
    //     }
    // }
}
