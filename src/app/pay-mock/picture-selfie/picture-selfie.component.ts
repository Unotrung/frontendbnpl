import { Component, OnInit } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from "ngx-webcam";
import {Observable, Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {CameraModalComponent} from "../camera-modal/camera-modal.component";
import {PictureService} from "../picture.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor(
      private dialog: MatDialog,
      public pictureService: PictureService
  ) { }

  ngOnInit(): void {
    this.citizenId = new FormControl('', [Validators.pattern(/\b\d{9}\b|\b\d{12}\b/g), Validators.required])
  }

  onFileChanged(event: any) {
    console.log(event);
  }

  startCaptureImage() {
    const dialogRef = this.dialog.open(CameraModalComponent, {disableClose: true})
  }
}
