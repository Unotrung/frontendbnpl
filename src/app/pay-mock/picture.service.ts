import { Injectable } from '@angular/core';
import {WebcamImage} from "ngx-webcam";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  webcamImage: WebcamImage | null = null;

  constructor(private http: HttpClient) { }

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
