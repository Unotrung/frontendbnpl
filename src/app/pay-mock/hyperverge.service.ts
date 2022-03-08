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
import {map, Observable, tap} from "rxjs";
import axios from "axios";

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
  serverAPI =''
  constructor(private http: HttpClient) {
    this.HyperSnapSDK = HyperSnapSDK;
    this.HyperSnapParams = HyperSnapParams;
    this.HVFaceConfig = HVFaceConfig;
    this.HVDocConfig = HVDocConfig;
    this.HVFaceModule = HVFaceModule;
    this.HVDocsModule = HVDocsModule;
    this.HVNetworkHelper = HVNetworkHelper;
    this.serverAPI = environment.appServerAPI
  }

  ngOnInit(): void {

  }
  onGetHVToken(): Observable<any> {
    // try {
    //   const { data } = await axios({
    //     url: 'https://auth.hyperverge.co/login',
    //     method: 'post',
    //     data: {
    //       "appId": "abe84d",
    //       "appKey": "7d2c0d7e1690c216458c",
    //       "expiry": 900
    //     },
    //     headers : {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   console.log(data)
    // } catch (error) {
    //   console.error(error)
    // }
    const uri = `${this.serverAPI}hvtoken`
    return this.http.get(encodeURI(uri));
  }
}
