import {Injectable} from '@angular/core';
import {WebcamImage} from "ngx-webcam";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, finalize} from "rxjs";
import {HypervergeService} from "./hyperverge.service";
import {LoadingService} from "./loading.service";
import {MessageService} from "./message.service";
import {MessageReason} from "./message";
import {checkInfo} from "./helper/helper";
import {AuthBnplService} from "./auth-bnpl.service";
import {Step} from "./step";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

export enum NCardSide {
    front = 'front',
    back = 'back',
    selfie = 'selfie'
}

@Injectable({
    providedIn: 'root'
})
export class PictureService {
    webcamImage: WebcamImage | null = null;
    selfieImage = '';
    selfieImageComplete$: BehaviorSubject<boolean>
    citizenFrontImage = '';
    citizenFrontImageComplete$: BehaviorSubject<boolean>
    citizenFrontData$: BehaviorSubject<any>

    citizenBackImage = '';
    citizenBackData$: BehaviorSubject<any>

    // currentShot$ use for check back or front image, not selfie
    currentShot$: BehaviorSubject<NCardSide | null>
    citizenBackImageComplete$: BehaviorSubject<boolean>
    // kycCustomerComplete$: BehaviorSubject<boolean>
    initPictureService$: BehaviorSubject<boolean>
    hvInit$: BehaviorSubject<boolean>


    constructor(
        private http: HttpClient,
        private hv: HypervergeService,
        private loadingService: LoadingService,
        private messageService: MessageService,
        private authService: AuthBnplService,
        private translate: TranslateService,
        private router: Router,
    ) {
        this.initPictureService$ = new BehaviorSubject<boolean>(false)
        this.hvInit$ = new BehaviorSubject<boolean>(false)
        this.selfieImageComplete$ = new BehaviorSubject<boolean>(false);
        this.citizenFrontData$ = new BehaviorSubject<any>(null);
        this.citizenBackData$ = new BehaviorSubject<any>(null);
        this.citizenFrontImageComplete$ = new BehaviorSubject<boolean>(false);
        this.citizenBackImageComplete$ = new BehaviorSubject<boolean>(false);
        this.currentShot$ = new BehaviorSubject<NCardSide | null>(null)
        this.initHVToken()
    }

    initHVToken() {
        console.log('init picture service')
        this.loadingService.loading$.next(true)
        this.hv.onGetHVToken().pipe(
            finalize(() => {
                this.loadingService.loading$.next(false)
            })
        ).subscribe({
            next: data => {
                if (data && data.status) {
                    const token = data['token']
                    this.hv.HyperSnapSDK.init(token, this.hv.HyperSnapParams.Region.AsiaPacific);
                    this.hv.HyperSnapSDK.startUserSession();
                } else {
                    this.hv.HyperSnapSDK.init(environment.hyperVergeToken, this.hv.HyperSnapParams.Region.AsiaPacific);
                    this.hv.HyperSnapSDK.startUserSession();
                }
            }, complete: () => {
                this.hvInit$.next(true)
                this.initPictureService$.next(true)
            }
        })
    }

    selfieScreenShot() {

        // this.hv.HyperSnapSDK.init(environment.hyperVergeToken, this.hv.HyperSnapParams.Region.AsiaPacific);
        // this.hv.HyperSnapSDK.startUserSession();
        const hvFaceConfig = new this.hv.HVFaceConfig();
        // hvFaceConfig.setShouldShowInstructionPage(true);
        hvFaceConfig.faceTextConfig.setFaceCaptureTitle(this.translate.instant('hv.face.faceCaptureTitle'))
        hvFaceConfig.faceTextConfig.setFaceCaptureBottomDescription(this.translate.instant('hv.face.faceCaptureBottomDescription'))
        hvFaceConfig.faceTextConfig.setFaceNotDetectedDescription(this.translate.instant('hv.face.faceNotDetectedDescription'))
        hvFaceConfig.faceTextConfig.setFaceTooBigDescription(this.translate.instant('hv.face.faceTooBigDescription'))
        hvFaceConfig.faceTextConfig.setFaceDetectedDescription(this.translate.instant('hv.face.faceDetectedDescription'))
        hvFaceConfig.faceTextConfig.setFaceCaptureReviewTitle(this.translate.instant('hv.face.faceCaptureReviewTitle'))
        hvFaceConfig.faceTextConfig.setFaceCaptureReviewBottomDescription(this.translate.instant('hv.face.faceCaptureReviewBottomDescription'))

        const callback = (HVError: any, HVResponse: any) => {
            if (HVError) {
                const errorCode = HVError.getErrorCode();
                const errorMessage = HVError.getErrorMessage();
                console.log('hverror', HVError);
                if (errorCode === '013') {
                    return
                }
                // this.openMessageDialog(MessageReason.failSelfieScreenShot)
                if (errorCode === 401) {
                    //token expired
                        //todo Check the token generator
                        this.hvInit$.next(false)
                        this.openMessageDialog(MessageReason.failOnHVTokenExpired)
                        console.error(errorMessage);
                        return;

                }
                this.openMessageDialog(MessageReason.failSelfieScreenShot)
            }
            if (HVResponse) {
                const apiResults = HVResponse.getApiResult();
                console.log(apiResults)
                const apiHeaders = HVResponse.getApiHeaders();
                const imageBase64 = HVResponse.getImageBase64();
                const attemptsCount = HVResponse.getAttemptsCount();
                // if (apiResults && apiResults['status'] === 'success') {
                //     this.onSelfieComplete(true, imageBase64);
                // }
                this.acceptImage(NCardSide.selfie, imageBase64)
            }
        };
        this.hv.HVFaceModule.start(hvFaceConfig, callback);
    }

    // onSelfieComplete(complete: boolean, image: any) {
    //     this.selfieImage = image;
    //     this.selfieImageComplete$.next(complete);
    // }

    citizenCardShot(side: NCardSide) {
        const hvDocConfig = new this.hv.HVDocConfig();
        hvDocConfig.docTextConfig.setDocCaptureBottomDescription(this.translate.instant('hv.doc.docCaptureBottomDescription'))
        hvDocConfig.docTextConfig.setDocCaptureReviewTitle(this.translate.instant('hv.doc.docCaptureReviewTitle'))
        hvDocConfig.docTextConfig.setDocReviewBottomDescription(this.translate.instant('hv.doc.docReviewBottomDescription'))
        if (side === NCardSide.front) {
            hvDocConfig.setOCRDetails("https://vnm-docs.hyperverge.co/v2/nationalID", hvDocConfig.DocumentSide.FRONT, {}, {});
            hvDocConfig.docTextConfig.setDocCaptureTitle(this.translate.instant('hv.doc.docCaptureTitleFront'))
        } else if (side === NCardSide.back) {
            hvDocConfig.setOCRDetails("https://vnm-docs.hyperverge.co/v2/nationalID", hvDocConfig.DocumentSide.BACK, {}, {});
            hvDocConfig.docTextConfig.setDocCaptureTitle(this.translate.instant('hv.doc.docCaptureTitleBack'))
        }


        const callback = (HVError: any, HVResponse: any) => {
            if (HVError) {
                const errorCode = HVError.getErrorCode();
                const errorMessage = HVError.getErrorMessage();
                console.log(HVError);
                if (errorCode) {
                    console.log(errorCode);
                }
                if (errorCode === '013') {
                    console.log(errorCode)
                    return
                }
                if (errorCode === 401) {
                        console.error(errorCode);
                        console.error(errorMessage)
                    //token expired
                        this.hvInit$.next(false)
                        this.openMessageDialog(MessageReason.failOnHVTokenExpired)
                        // this.router.navigate(['pay-mock/register']).then()
                        return;
                }
                if (side === NCardSide.front) {
                    this.openMessageDialog(MessageReason.failFrontIdScreenShot)
                }
                if (side === NCardSide.back) {
                    this.openMessageDialog(MessageReason.failBackIdScreenShot)
                }

            }
            if (HVResponse) {
                const apiResults = HVResponse.getApiResult();

                const apiHeaders = HVResponse.getApiHeaders();
                console.log('screen shot', side, apiResults)
                console.log(apiHeaders)
                if (apiResults['result']['summary']['action'] !== 'pass' || this.checkInfoReview(side)) {
                    if (side === NCardSide.front) {
                        this.openMessageDialog(MessageReason.failFrontIdScreenShot)
                    } else if (side === NCardSide.back) {
                        this.openMessageDialog(MessageReason.failBackIdScreenShot)
                    }
                    return
                }

                const imageBase64 = HVResponse.getImageBase64();
                const attemptsCount = HVResponse.getAttemptsCount();
                this.acceptImage(side, imageBase64, apiResults['result']['details'][0]['fieldsExtracted'])
            }
        };

        this.hv.HVDocsModule.start(hvDocConfig, callback);
    }

    verifyNidAndFrontImage(): boolean {
        console.log(this.citizenFrontData$.getValue())
        let match = true
        if (checkInfo(this.citizenFrontData$.getValue()['idNumber']).value !== this.authService.user$.getValue().citizenId) {
            // this.citizenFrontImageComplete$.next(false)
            match = false
            this.deleteImage(NCardSide.front)
            this.authService.registerStep$.next(Step.pictureSelfie);
            this.openMessageDialog(MessageReason.failOnCheckCitizenIdAndManualEnterId)
        }
        return match
    }

    verifyMatchImage(): boolean {
        console.log('verify match image')
        let match = false
        const callback = (HVError: any, HVResponse: any) => {
            this.loadingService.loading$.next(false)
            if (HVError) {
                const errorCode = HVError.getErrorCode();
                if (errorCode) {
                    console.log(errorCode);
                }
                const errorMessage = HVError.getErrorMessage();
                this.deleteImage(NCardSide.selfie)
                this.deleteImage(NCardSide.front)
                this.openMessageDialog(MessageReason.failOnCheckSelfieAndImageIdCard)
                return;
            }
            if (HVResponse) {
                const apiResults = HVResponse.getApiResult();
                const apiHeaders = HVResponse.getApiHeaders();
                console.log(apiResults);
                if (apiResults && apiResults['result']['match'] === 'yes') {
                    // this.kycCustomerComplete$.next(true);
                    match = true
                    return;
                }
                if (apiResults && apiResults['result']['match'] === 'no') {
                    this.deleteImage(NCardSide.front)
                    this.deleteImage(NCardSide.selfie)
                    this.openMessageDialog(MessageReason.failOnCheckSelfieAndImageIdCard)
                    return;
                }
            }
        };
        this.loadingService.loading$.next(true)

        this.hv.HVNetworkHelper.makeFaceMatchCall(this.selfieImage, this.citizenFrontImage, {}, {}, callback);
        return match
    }

    acceptImage(side: NCardSide , image: string, data?: any) {
        if (side === NCardSide.selfie) {
            this.selfieImage = image
            this.selfieImageComplete$.next(true)
            return;
        }
        this.currentShot$.next(side)
        if (side === NCardSide.front) {
            this.citizenFrontImage = image
            this.citizenFrontImageComplete$.next(true)
            this.citizenFrontData$.next(data)
            if (!this.verifyNidAndFrontImage()) {
                return
            }
            this.verifyMatchImage()
        }
        if (side === NCardSide.back) {
            this.citizenBackImage = image
            this.citizenBackImageComplete$.next(true)
            this.citizenBackData$.next(data)
        }
    }

    deleteImage(side: NCardSide) {
        if (side === NCardSide.selfie) {
            this.selfieImage = ''
            this.selfieImageComplete$.next(false)
            this.citizenFrontData$.next(null)
            return
        }
        if (side === NCardSide.front) {
            this.citizenFrontImage = ''
            this.citizenFrontImageComplete$.next(false)
            this.citizenFrontData$.next(null)
            if (this.citizenBackImageComplete$.getValue()) {
                this.currentShot$.next(NCardSide.back)
            } else {
                this.currentShot$.next(null)
            }
            return;
        }
        if (side === NCardSide.back) {
            this.citizenBackImage = ''
            this.citizenBackImageComplete$.next(false)
            this.citizenBackData$.next(null)
            if (this.citizenFrontImageComplete$.getValue()) {
                this.currentShot$.next(NCardSide.front)
            } else {
                this.currentShot$.next(null)
            }
        }
    }




    dataURItoBlob(dataURI: string) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: mimeString});
    }

    openMessageDialog(reason: MessageReason) {
        this.messageService.messageDialog(reason)
    }
    // this get backside or frontside on screen
    get imageCurrentShot(): string {
        if (!this.currentShot$.getValue()) {
            return ''
        }
        if (this.currentShot$.getValue() === NCardSide.front) {
            return this.citizenFrontImage
        }
        return  this.citizenBackImage
    }

    clearData(){
        this.deleteImage(NCardSide.selfie)
        this.deleteImage(NCardSide.front)
        this.deleteImage(NCardSide.back)
    }

    checkInfoReview(side: NCardSide): boolean{
        if (side === NCardSide.front && this.citizenFrontData$.getValue()) {
            const frontData = this.citizenFrontData$.getValue()
            return checkInfo(frontData['dob']).confirm &&
                checkInfo(frontData['doe']).confirm &&
                checkInfo(frontData['idNumber']).confirm &&
                checkInfo(frontData['name']).confirm &&
                checkInfo(frontData['permanentAddress']).confirm
        }
        if (side === NCardSide.back && this.citizenBackData$.getValue()) {
            const backData = this.citizenBackData$.getValue()
            return checkInfo(backData['doi']).confirm
        }
        return false
    }

    // checkSelfieImage(): Observable<any> {
    // const headers = new HttpHeaders()
    //     .set('appId', environment.appId)
    //     .set('appKey', environment.appKey)
    //     .set('transactionId', 'zzz')
    //     .set('content-type', 'multipart/form-data;')
    //
    // const formData = new FormData();
    // // @ts-ignore
    // fetch(this.webcamImage?.imageAsDataUrl)
    //     .then(res => res.blob())
    //     .then(blob => {
    //       const fileOfBlob = new File([blob], 'abc.png');
    //       formData.append('image', fileOfBlob)
    //     })
    // // @ts-ignore
    // // formData.append('image', this.dataURItoBlob(this.webcamImage?.imageAsDataUrl), '@abc.png')
    // return this.http.post<any>('https://vnm-docs.hyperverge.co/v2/nationalID', formData, {
    //   headers
    // })
    // }
}
