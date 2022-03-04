
import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CameraModalComponent} from "../camera-modal/camera-modal.component";
import {PictureService} from "../picture.service";
import {FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

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
  // formGroup!: FormGroup;
  apiResults: any

  constructor(
      private dialog: MatDialog,
      public pictureService: PictureService,
      private http: HttpClient
  ) { }

  ngOnInit(): void {

    // this.pictureService.selfieScreenShot()

    this.citizenId = new FormControl('', [Validators.pattern(/\b\d{9}\b|\b\d{12}\b/g), Validators.required])
    // this.formGroup = new FormGroup({
    //   citizenImage: new FormControl(''),
    //   image: new FormControl('')
    // })
  }

  onFileChanged(event: any) {
    console.log(event);
  }

  onDeleteImage(){
    this.pictureService.onSelfieComplete(false, '');
  }

  startCaptureImage() {

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
