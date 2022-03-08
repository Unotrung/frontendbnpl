import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationAddressService} from "../location-address.service";
import {BehaviorSubject, map, Observable, startWith} from "rxjs";
import {City, District, Ward} from "../vietnamLocation";
import {Router} from "@angular/router";
import {CustomerInformationService} from "../customer-information.service";
import {AuthService} from "../auth.service";
import {Step} from "../step";
import {PictureService} from "../picture.service";

@Component({
  selector: 'app-customer-information-register',
  templateUrl: './customer-information-register.component.html',
  styleUrls: ['./customer-information-register.component.scss']
})
export class CustomerInformationRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  cityFilteredOptions!: Observable<string[]>;
  districtFilteredOptions!: Observable<string[]>;
  wardFilteredOptions!: Observable<string[]>;
  personalTitleFilterOptions!: Observable<string[]>;

  cityOptions : City[] = []
  districtOptions : District[] = []
  wardOptions: Ward[] = []
  personalTitleOptions!: string[]


  vietnamLocationData: any;
  selectedCity! : BehaviorSubject<City>;
  selectedDistrict!: BehaviorSubject<District>;
  selectedWard!: BehaviorSubject<Ward>;
  selectedStreet!: BehaviorSubject<any>;

  constructor(
      private locationAddressService: LocationAddressService,
      private customerInformationService: CustomerInformationService,
      private authService: AuthService,
      private router: Router,
      private pictureService: PictureService
  ) { }

  ngOnInit(): void {

    console.log(this.pictureService.citizenFrontData$.getValue())
    console.log(this.pictureService.citizenBackData$.getValue())

    this.personalTitleOptions = ['Ông', 'Bà', 'Vợ', 'Chồng', 'Con']

    this.registerForm = new FormGroup({
      name: new FormControl(''),
      sex: new FormControl(''),
      phone: new FormControl(''),
      birthday: new FormControl(Date.now()),
      citizenId: new FormControl(''),
      issueDate: new FormControl(Date.now()),
      city: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      personal_title: new FormControl('', [Validators.required]),
      name_ref: new FormControl('', [Validators.required]),
      phone_ref: new FormControl('', [Validators.required])
    })
    this.locationAddressService.getJSON().subscribe(data => {
      this.vietnamLocationData = data as any[];
      Object.entries(this.vietnamLocationData).forEach(
          ([key, value]) => this.cityOptions[+key] = <City>value
      );
      this.selectedCity = new BehaviorSubject<City>(this.cityOptions[0]);

      // @ts-ignore
      this.selectedDistrict = new BehaviorSubject<District>(this.cityOptions[0]['districts'][0]);

      // @ts-ignore
      this.selectedWard = new BehaviorSubject<Ward>(this.cityOptions[0]['districts'][0]['wards'][0]);

      this.selectedCity.subscribe(city => {
        // @ts-ignore
        Object.entries(city['districts']).forEach(([subKey, district]) => {
          this.districtOptions[+subKey] = <District>district;
        })
        // console.log(this.districtOptions)
      })
      this.selectedDistrict.subscribe(district => {
        // @ts-ignore
        Object.entries(district['wards']).forEach(([key, ward]) => {
          this.wardOptions[+key] = <Ward>ward;
        })
      })
    })
    this.cityFilteredOptions = this.f['city'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value, 'city'))
    )
    this.districtFilteredOptions = this.f['district'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value, 'district'))
    )
    this.wardFilteredOptions = this.f['ward'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value, 'ward'))
    )
    this.personalTitleFilterOptions = this.f['personal_title'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value, 'personal_title'))
    )
    this.f['phone'].setValue(this.authService.user$.getValue().phone);
    this.f['citizenId'].setValue(this.authService.user$.getValue().citizenId);
  }

  private _filter(value: string, zone: string): string[] {
    const filterValue = value.toLowerCase();
    if (zone === 'city') {
      const options = this.cityOptions.map(value => value.name)
      return options.filter(option => option.toLowerCase().includes(filterValue));
    }
    if (zone === 'district') {
      const options = this.districtOptions.map(value => value.name)
      return options.filter(option => option.toLowerCase().includes(filterValue));
    }
    if (zone === 'ward') {
      const options = this.wardOptions.map(value => value.name)
      return options.filter(option => option.toLowerCase().includes(filterValue))
    }
    if (zone === 'personal_title') {
      return this.personalTitleOptions.filter(option => option.toLowerCase().includes(filterValue))
    }
    return []
  }

  // private cityOptions(): any {
  //   for (let [key, value] of Object.entries(this.vietnamLocationData)){
  //     console.log(`${key}: ${value}`);
  //   }
  // }

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  get f(): {
    [key: string]: AbstractControl;
  } { return this.registerForm.controls; }

  onSelectedCity(city: string){
    this.districtOptions.length = 0;
    this.cityOptions.forEach((value, index) => {
      if (city === value.name){
        this.selectedCity.next(value);
        this.f['district'].setValue('');
      }
    })

  }

  onSelectedDistrict(district: string) {
    this.wardOptions.length = 0;
    this.districtOptions.forEach((value, index) => {
      if (district === value.name) {
        this.selectedDistrict.next(value);
        this.f['ward'].setValue('');
      }
    })
  }

  onContinue() {
    this.authService.registerStep$.next(Step.customerConfirmInfo)
    this.customerInformationService.customerInfo = {
    // @ts-ignore
      name: this.f['name'].value,
      sex: this.f['sex'].value,
      phone: this.f['phone'].value,
      birthday: this.f['birthday'].value,
      citizenId: this.f['citizenId'].value,
      issueDate: this.f['issueDate'].value,

      city: this.f['city'].value,
      district: this.f['district'].value,
      ward: this.f['ward'].value,
      street: this.f['street'].value,

      personal_title: this.f['personal_title'].value,
      name_ref: this.f['name_ref'].value,
      phone_ref: this.f['phone_ref'].value
    }

    this.router.navigate(['/pay-mock/customer-confirm-info']).then();
  }
}
