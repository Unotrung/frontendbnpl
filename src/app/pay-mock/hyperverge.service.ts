import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

declare var HyperSnapSDK: any;
declare var HyperSnapParams: any;
declare var HVFaceConfig: any;
declare var HVFaceModule: any;
declare var HVDocConfig: any;
declare var HVDocsModule: any;
declare var HVNetworkHelper: any;
import {Injectable, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HypervergeService implements OnInit{

  HyperSnapSDK: any;
  HyperSnapParams: any;
  HVFaceConfig: any;
  HVFaceModule: any;
  HVDocConfig: any;
  HVDocsModule: any;
  HVNetworkHelper: any;
  hvToken: string | null = null;
  constructor(private http: HttpClient) {
    this.HyperSnapSDK = HyperSnapSDK;
    this.HyperSnapParams = HyperSnapParams;
    this.HVFaceConfig = HVFaceConfig;
    this.HVDocConfig = HVDocConfig;
    this.HVFaceModule = HVFaceModule;
    this.HVDocsModule = HVDocsModule;
    this.HVNetworkHelper = HVNetworkHelper;
  }

  ngOnInit(): void {

  }
  onGetHVToken(): Observable<string> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json' );

    const params = {
      'appId': environment.appId,
      'appKey': environment.appKey,
      'expiry': 900
        }
    return this.http.post<any>('https://auth.hyperverge.co/login', params, {
      headers
    })
  }
}
