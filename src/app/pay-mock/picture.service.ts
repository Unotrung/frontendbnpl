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

    currentShotImage = '';
    citizenBackImageComplete$: BehaviorSubject<boolean>
    kycCustomerComplete$: BehaviorSubject<boolean>
    hvInit$: BehaviorSubject<boolean>


    constructor(
        private http: HttpClient,
        private hv: HypervergeService,
        private loadingService: LoadingService,
        private messageService: MessageService,
        private authService: AuthBnplService
    ) {
        this.hvInit$ = new BehaviorSubject<boolean>(false)
        this.selfieImageComplete$ = new BehaviorSubject<boolean>(false);
        this.citizenFrontData$ = new BehaviorSubject<any>(null);
        this.citizenBackData$ = new BehaviorSubject<any>(null);
        this.citizenFrontImageComplete$ = new BehaviorSubject<boolean>(false);
        this.citizenBackImageComplete$ = new BehaviorSubject<boolean>(false);
        this.kycCustomerComplete$ = new BehaviorSubject<boolean>(false);
        this.citizenBackImageComplete$.subscribe(completed => {
            if (completed && this.citizenFrontImageComplete$.getValue()) {
                console.log('start verify match')
                this.onVerifyMatchImage();
            } else return;
        })
        // this.citizenFrontImageComplete$.subscribe({
        //   next : completed => {
        //     if (completed && this.citizenBackImageComplete$.getValue()) {
        //       console.log('start verify match')
        //       this.onVerifyMatchImage();
        //     }
        //   }
        // })
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
            }
        })

    }

    selfieScreenShot() {

        // this.hv.HyperSnapSDK.init(environment.hyperVergeToken, this.hv.HyperSnapParams.Region.AsiaPacific);
        // this.hv.HyperSnapSDK.startUserSession();

        const hvFaceConfig = new this.hv.HVFaceConfig();
        hvFaceConfig.setShouldShowInstructionPage(true);

        const callback = (HVError: any, HVResponse: any) => {
            if (HVError) {
                const errorCode = HVError.getErrorCode();
                const errorMessage = HVError.getErrorMessage();
                console.log('hverror', HVError);
                this.messageService.messageData$.next({
                    reason: MessageReason.failSelfieScreenShot,
                    message: 'Hình chụp selfie không rõ, đề nghị chụp lại',
                    messageTitle: 'Thông báo',
                    closeMessage: 'CHỤP LẠI HÌNH'
                })
                this.messageService.onOpenDialog()
                if (errorCode === 401) {
                    if (errorMessage === 'Token Expired') {
                        //todo Check the token generator
                        console.error(errorMessage);
                        return;
                    }
                }
            }
            if (HVResponse) {
                const apiResults = HVResponse.getApiResult();
                const apiHeaders = HVResponse.getApiHeaders();
                const imageBase64 = HVResponse.getImageBase64();
                const attemptsCount = HVResponse.getAttemptsCount();
                if (apiResults && apiResults['status'] === 'success') {
                    this.onSelfieComplete(true, imageBase64);
                }
            }
        };
        this.hv.HVFaceModule.start(hvFaceConfig, callback);
    }

    onSelfieComplete(complete: boolean, image: any) {
        this.selfieImage = image;
        this.selfieImageComplete$.next(complete);
    }

    citizenCardShot(side: NCardSide) {
        const hvDocConfig = new this.hv.HVDocConfig();
        if (side === NCardSide.front) {
            hvDocConfig.setOCRDetails("https://vnm-docs.hyperverge.co/v2/nationalID", hvDocConfig.DocumentSide.FRONT, {}, {});
        } else if (side === NCardSide.back) {
            hvDocConfig.setOCRDetails("https://vnm-docs.hyperverge.co/v2/nationalID", hvDocConfig.DocumentSide.BACK, {}, {});
        }


        const callback = (HVError: any, HVResponse: any) => {
            if (HVError) {
                const errorCode = HVError.getErrorCode();
                const errorMessage = HVError.getErrorMessage();
                console.log(HVError);
                if (errorCode) {
                    console.log(errorCode);
                }
                if (errorCode === 401) {
                    if (errorMessage === 'Token Expired') {
                        //todo Check the token generator
                        console.error(errorMessage);
                        return;
                    }
                }
                if (side === NCardSide.front) {
                    // this.messageService.messageData$.next({
                    //   reason: MessageReason.failFrontIdScreenShot,
                    //   messageTitle: 'Thông báo',
                    //   message: 'Lỗi chụp hình cmnd/cccd mặt trước, đề nghị chụp lại',
                    //   closeMessage: 'Chụp lại'
                    // })
                    this.openMessageDialog(MessageReason.failFrontIdScreenShot)
                }
                if (side === NCardSide.back) {
                    // this.messageService.messageData$.next({
                    //   reason: MessageReason.failFrontIdScreenShot,
                    //   messageTitle: 'Thông báo',
                    //   message: 'Lỗi chụp hình cmnd/cccd mặt sau, đề nghị chụp lại',
                    //   closeMessage: 'Chụp lại'
                    // })
                    console.log('goi thong bao mat sau')
                    this.openMessageDialog(MessageReason.failBackIdScreenShot)
                }
                // this.messageService.onOpenDialog()

            }
            if (HVResponse) {
                const apiResults = HVResponse.getApiResult();

                const apiHeaders = HVResponse.getApiHeaders();
                console.log('screen shot', side, apiResults)
                console.log(apiHeaders)
                if (apiResults['result']['summary']['action'] !== 'pass') {
                    if (side === NCardSide.front) {
                        this.openMessageDialog(MessageReason.failFrontIdScreenShot)
                    } else if (side === NCardSide.back) {
                        console.log('goi thong bao mat sau')
                        this.openMessageDialog(MessageReason.failBackIdScreenShot)
                    }
                    return
                }

                if (side === NCardSide.front) {
                    this.citizenFrontData$.next(<Array<any>>apiResults['result']['details'][0]['fieldsExtracted'])
                }
                if (side === NCardSide.back) {
                    this.citizenBackData$.next(<Array<any>>apiResults['result']['details'][0]['fieldsExtracted'])
                }

                const imageBase64 = HVResponse.getImageBase64();
                const attemptsCount = HVResponse.getAttemptsCount();
                if (apiResults && apiResults['status'] === 'success') {
                    this.onCitizenCardComplete(true, side, imageBase64);
                }
            }
        };

        this.hv.HVDocsModule.start(hvDocConfig, callback);
    }

    onCitizenCardComplete(complete: boolean, side: NCardSide, image: any) {
        if (complete) {
            this.currentShotImage = image;
        }

        if (side === NCardSide.front) {
            // @ts-ignore
            // console.log(checkInfo(this.citizenFrontData$.getValue()['idNumber']).value)
            // console.log(this.authService.user$.getValue().citizenId)
            // @ts-ignore
            if (checkInfo(this.citizenFrontData$.getValue()['idNumber']).value !== this.authService.user$.getValue().citizenId) {
                this.citizenFrontImageComplete$.next(false)
                this.authService.registerStep$.next(Step.pictureSelfie);
                // this.messageService.messageData$.next({
                //   reason: MessageReason.failOnCheckCitizenIdAndManualEnterId,
                //   messageTitle: 'Thông báo',
                //   message: 'Hồ sơ của bạn không được chấp nhận do số CCCD không trùng với số bạn điền vào',
                //   closeMessage: 'Điền lại số CCCD'
                // })
                // this.messageService.onOpenDialog()
                this.openMessageDialog(MessageReason.failOnCheckCitizenIdAndManualEnterId)
                return
            }
            this.citizenFrontImage = image;
            this.citizenFrontImageComplete$.next(complete);
        } else if (side === NCardSide.back) {
            this.citizenBackImage = image;
            this.citizenBackImageComplete$.next(complete);
        }
        if (!complete) {
            if (!(this.citizenFrontImageComplete$ || this.citizenBackImageComplete$)) {
                this.currentShotImage = ''
            }
            this.kycCustomerComplete$.next(false);
        }
    }

    onVerifyMatchImage() {
        const callback = (HVError: any, HVResponse: any) => {
            this.loadingService.loading$.next(false)
            if (HVError) {
                const errorCode = HVError.getErrorCode();
                if (errorCode) {
                    console.log(errorCode);
                }
                const errorMessage = HVError.getErrorMessage();
                this.selfieImageComplete$.next(false)
                this.citizenFrontImageComplete$.next(false)
                // this.messageService.messageData$.next({
                //   reason: MessageReason.failOnCheckSelfieAndImageIdCard,
                //   messageTitle: 'Thông báo',
                //   message: 'Ảnh chân dung và ảnh trên CCCD không khớp, đề nghị chụp lại',
                //   closeMessage: 'CHỤP ẢNH LẠI',
                // })
                // this.messageService.onOpenDialog()
                this.openMessageDialog(MessageReason.failOnCheckSelfieAndImageIdCard)
                return;
            }
            if (HVResponse) {
                const apiResults = HVResponse.getApiResult();
                const apiHeaders = HVResponse.getApiHeaders();
                console.log(apiResults);
                if (apiResults && apiResults['result']['match'] === 'yes') {
                    this.kycCustomerComplete$.next(true);
                    return;
                }
                if (apiResults && apiResults['result']['match'] === 'no') {
                    this.selfieImageComplete$.next(false)
                    this.citizenFrontImageComplete$.next(false)
                    // this.messageService.messageData$.next({
                    //   reason: MessageReason.failOnCheckSelfieAndImageIdCard,
                    //   messageTitle: 'Thông báo',
                    //   message: 'Ảnh chân dung và ảnh trên CCCD không khớp, đề nghị chụp lại',
                    //   closeMessage: 'CHỤP ẢNH LẠI',
                    // })
                    // this.messageService.onOpenDialog()
                    this.openMessageDialog(MessageReason.failOnCheckSelfieAndImageIdCard)
                    return;
                }
            }
        };
        this.loadingService.loading$.next(true)

        this.hv.HVNetworkHelper.makeFaceMatchCall(this.selfieImage, this.citizenFrontImage, {}, {}, callback);
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
        if (reason === MessageReason.failOnCheckSelfieAndImageIdCard) {
            this.messageService.messageData$.next({
                reason: MessageReason.failOnCheckSelfieAndImageIdCard,
                messageTitle: 'Thông báo',
                message: 'Ảnh chân dung và ảnh trên CCCD không khớp, đề nghị chụp lại',
                closeMessage: 'CHỤP ẢNH LẠI',
            })
        }
        if (reason === MessageReason.failOnCheckCitizenIdAndManualEnterId) {
            this.messageService.messageData$.next({
                reason: MessageReason.failOnCheckCitizenIdAndManualEnterId,
                messageTitle: 'Thông báo',
                message: 'Hồ sơ của bạn không được chấp nhận do số CCCD không trùng với số bạn điền vào',
                closeMessage: 'Điền lại số CCCD'
            })
        }
        if (reason === MessageReason.failFrontIdScreenShot) {
            this.messageService.messageData$.next({
                reason: MessageReason.failFrontIdScreenShot,
                messageTitle: 'Thông báo',
                message: 'Lỗi chụp hình cmnd/cccd mặt trước, đề nghị chụp lại',
                closeMessage: 'Chụp lại'
            })
        }
        if (reason === MessageReason.failBackIdScreenShot) {
            this.messageService.messageData$.next({
                reason: MessageReason.failBackIdScreenShot,
                messageTitle: 'Thông báo',
                message: 'Lỗi chụp hình cmnd/cccd mặt sau, đề nghị chụp lại',
                closeMessage: 'Chụp lại'
            })
        }

        this.messageService.onOpenDialog()
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
