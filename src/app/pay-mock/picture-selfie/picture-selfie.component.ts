import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NCardSide, PictureService} from "../picture.service";
import {
    AbstractControl,
    FormControl,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthBnplService} from "../auth-bnpl.service";
import {Router} from "@angular/router";
import {Step} from "../step";
import {keyPress} from "../helper/helper";
import {InputType} from "../user";
import {EMPTY, firstValueFrom, map, Observable, of} from "rxjs";
import {HttpError} from "../http-error";

@Component({
    selector: 'app-picture-selfie',
    templateUrl: './picture-selfie.component.html',
    styleUrls: ['./picture-selfie.component.scss']
})
export class PictureSelfieComponent implements OnInit {

    selfieImage = '';
    citizenIdFrontImage = '';
    citizenIdBackImage = '';
    citizenId!: FormControl;
    apiResults: any
    instruction: boolean = false
    keyPress = keyPress
    InputType = InputType

    constructor(
        private dialog: MatDialog,
        public pictureService: PictureService,
        private http: HttpClient,
        private authService: AuthBnplService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {

        const citizenId = this.authService.user$.getValue().citizenId

        this.citizenId = new FormControl(citizenId, {
            validators:
                [
                    Validators.pattern(/\b\d{9}\b|\b\d{12}\b/),
                    Validators.required],
            asyncValidators: [
                this.validatorNidExist.bind(this)
            ],
            updateOn: 'blur'
        })

    }

    onFileChanged(event: any) {
        console.log(event);
    }

    onDeleteImage() {
        this.pictureService.deleteImage(NCardSide.selfie)
    }

    startCaptureImage() {
        if (this.pictureService.selfieImageComplete$.getValue()) {
            this.onDeleteImage()
        }

        this.pictureService.selfieScreenShot();

        // const dialogRef = this.dialog.open(CameraModalComponent, {disableClose: true})
        // dialogRef.afterClosed().subscribe(() => {
        //   this.pictureService.checkSelfieImage().subscribe(data =>{
        //     console.log(data)
        //   },
        //       error => console.log(error))
        //   // console.log(this.pictureService.webcamImage?.imageAsDataUrl)
        // })
    }

    async validatorNidExist(control: AbstractControl): Promise<ValidationErrors | null> {
        if (!control.value) return of(null)
        try {
            await firstValueFrom(this.authService.checkNidExist(control.value))
            return {'nidExist': true}
        } catch (error: any) {
            if (error.status === HttpError.empty ) {
                console.log('empty input')
            }
            return null
        }
    }

    onSelfieContinue() {
        this.authService.user$.next({...this.authService.user$.getValue(), citizenId: this.citizenId.value})
        this.authService.registerStep$.next(Step.citizenCard);
        this.router.navigate(['pay-mock/citizen-card']).then();
    }

    // onFileSelect(event: any) {
    //   if (event.target.files.length > 0) {
    //     this.formGroup.patchValue({
    //       image: event.target.files[0]
    //     })
    //     const formData = new FormData();
    //     formData.set('image', this.formGroup.get('image')?.value);
    //     console.log(formData.get('image'))
    //     const headers = new HttpHeaders()
    //         .set('appId', environment.appId)
    //         .set('appKey', environment.appKey)
    //         .set('transactionId', 'zzz')
    //         .set('content-type', 'multipart/form-data;')
    //     console.log(headers)
    //
    //     // const XHR = new XMLHttpRequest();
    //     // XHR.addEventListener( 'load', function(event) {
    //     //   alert( 'Yeah! Data sent and response loaded.' );
    //     // } );
    //     //
    //     // // Define what happens in case of error
    //     // XHR.addEventListener( 'error', function(event) {
    //     //   alert( 'Oops! Something went wrong.' );
    //     // } );
    //     //
    //     // // Set up our request
    //     // XHR.open( 'POST', 'https://vnm-docs.hyperverge.co/v2/nationalID' );
    //     //
    //     // // Add the required HTTP header for form data POST requests
    //     // XHR.setRequestHeader( 'Content-Type', 'multipart/form-data;' );
    //     // XHR.setRequestHeader('appId', environment.appId);
    //     // XHR.setRequestHeader('appKey', environment.appKey);
    //     // XHR.setRequestHeader('transactionId', 'zzz');
    //
    //     this.http.post<any>('https://vnm-docs.hyperverge.co/v2/nationalID', formData, {
    //       headers
    //     }).subscribe(data => console.log(data))
    //     // XHR.send(formData);
    //   }
    // }
}
