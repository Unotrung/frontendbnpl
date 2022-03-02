import { Injectable } from '@angular/core';
import {WebcamImage} from "ngx-webcam";

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  webcamImage: WebcamImage | null = null;

  constructor() { }
}
