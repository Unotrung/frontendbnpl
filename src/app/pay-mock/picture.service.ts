import {Injectable} from '@angular/core';
import {WebcamImage} from "ngx-webcam";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {HypervergeService} from "./hyperverge.service";

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  webcamImage: WebcamImage | null = null;
  selfieImage = '';
  selfieImageComplete$: BehaviorSubject<boolean>
  citizenFrontImage = '';
  citizenFrontImageComplete = false
  citizenBackImage = '';
  currentShotImage = '';
  citizenBackImageComplete$ : BehaviorSubject<boolean>
  kycCustomerComplete$: BehaviorSubject<boolean>

  constructor(
      private http: HttpClient,
      private hv: HypervergeService
  ) {
    this.selfieImageComplete$ = new BehaviorSubject<boolean>(false);
    this.citizenBackImageComplete$ = new BehaviorSubject<boolean>(false);
    this.kycCustomerComplete$ = new BehaviorSubject<boolean>(false);
    this.citizenBackImageComplete$.subscribe(completed => {
      console.log('on verify')
      if (completed) {
        console.log('start')
        this.onVerifyMatchImage();
      }
      else return;
    })
    this.hv.onGetHVToken().subscribe(data => {
      if (data && data.status === 'success') {
        console.log(data)
        const token = data['result']['token']
        this.hv.HyperSnapSDK.init(token, this.hv.HyperSnapParams.Region.AsiaPacific);
        this.hv.HyperSnapSDK.startUserSession();
      }
      else {
        this.hv.HyperSnapSDK.init(environment.hyperVergeToken, this.hv.HyperSnapParams.Region.AsiaPacific);
        this.hv.HyperSnapSDK.startUserSession();
      }
    })


  }

  selfieScreenShot() {

    // this.hv.HyperSnapSDK.init(environment.hyperVergeToken, this.hv.HyperSnapParams.Region.AsiaPacific);
    // this.hv.HyperSnapSDK.startUserSession();

    const hvFaceConfig = new this.hv.HVFaceConfig();
    hvFaceConfig.setShouldShowInstructionPage(true);

    const callback = (HVError: any, HVResponse: any) => {
      if(HVError) {
        const errorCode = HVError.getErrorCode();
        const errorMessage = HVError.getErrorMessage();
        console.log(HVError);
        if (errorCode === 401) {
          if (errorMessage === 'Token Expired') {
            //todo Check the token generator
            console.error(errorMessage);
            return;
          }
        }
      }
      if(HVResponse) {
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

  onSelfieComplete (complete: boolean, image: any) {
    this.selfieImage = image;
    this.selfieImageComplete$.next(complete);
  }

  citizenCardShot(side: string) {
    const hvDocConfig = new this.hv.HVDocConfig();
    if (side === 'front') {
      hvDocConfig.setOCRDetails("https://vnm-docs.hyperverge.co/v2/nationalID",hvDocConfig.DocumentSide.FRONT, {}, {});
    } else if (side === 'back') {
      hvDocConfig.setOCRDetails("https://vnm-docs.hyperverge.co/v2/nationalID",hvDocConfig.DocumentSide.BACK, {}, {});
    }


    const callback = (HVError: any, HVResponse: any) => {
      if(HVError) {
        const errorCode = HVError.getErrorCode();
        const errorMessage = HVError.getErrorMessage();
        console.log(HVError);
        if(errorCode){
          console.log(errorCode);
        }
        if (errorCode === 401) {
          if (errorMessage === 'Token Expired') {
            //todo Check the token generator
            console.error(errorMessage);
            return;
          }
        }
      }
      if(HVResponse) {
        const apiResults = HVResponse.getApiResult();
        console.log(apiResults);
        const apiHeaders = HVResponse.getApiHeaders();
        const imageBase64 = HVResponse.getImageBase64();
        const attemptsCount = HVResponse.getAttemptsCount();
        if (apiResults && apiResults['status'] === 'success') {
          this.onCitizenCardComplete(true, side, imageBase64);
        }
      }
    };

    this.hv.HVDocsModule.start(hvDocConfig, callback);
  }

  onCitizenCardComplete(complete: boolean, side: string, image: any) {
    this.currentShotImage = image;
    if (side === 'front') {
      this.citizenFrontImage = image;
      this.citizenFrontImageComplete = complete;
    } else if (side === 'back') {
      this.citizenBackImage = image;
      this.citizenBackImageComplete$.next(complete);
    }
    if (!complete) {
      this.kycCustomerComplete$.next(false);
    }
  }

  onVerifyMatchImage(){
    const callback = (HVError: any, HVResponse: any) => {
      if(HVError) {
        const errorCode = HVError.getErrorCode();
        if(errorCode){
          console.log(errorCode);
        }
        const errorMessage = HVError.getErrorMessage();
      }
      if(HVResponse) {
        const apiResults = HVResponse.getApiResult();
        const apiHeaders = HVResponse.getApiHeaders();
        console.log(apiResults);
        if (apiResults && apiResults['result']['match'] === 'yes') {
          this.kycCustomerComplete$.next(true);
        }
      }
    };

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

    return new Blob([ia], {type:mimeString});
  }


  checkSelfieImage(): Observable<any> {
    const headers = new HttpHeaders()
        .set('appId', environment.appId)
        .set('appKey', environment.appKey)
        .set('transactionId', 'zzz')
        .set('content-type', 'multipart/form-data;')

    const formData = new FormData();
    // @ts-ignore
    fetch(this.webcamImage?.imageAsDataUrl)
        .then(res => res.blob())
        .then(blob => {
          const fileOfBlob = new File([blob], 'abc.png');
          formData.append('image', fileOfBlob)
        })
    // @ts-ignore
    // formData.append('image', this.dataURItoBlob(this.webcamImage?.imageAsDataUrl), '@abc.png')
    return this.http.post<any>('https://vnm-docs.hyperverge.co/v2/nationalID', formData, {
      headers
    })
  }
}
