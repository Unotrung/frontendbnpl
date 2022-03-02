import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationAddressService} from "../location-address.service";
import {BehaviorSubject, map, Observable, startWith} from "rxjs";
import {City, District, Ward} from "../vietnamLocation";

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

  cityOptions : City[] = []
  districtOptions : District[] = []
  wardOptions: Ward[] = []


  vietnamLocationData: any;
  selectedCity! : BehaviorSubject<City>;
  selectedDistrict!: BehaviorSubject<District>;
  selectedWard!: BehaviorSubject<Ward>;
  selectedStreet!: BehaviorSubject<any>;

  constructor(
      private locationAddressService: LocationAddressService
  ) { }

  ngOnInit(): void {
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
      this.selectedDistrictId = this.cityOptions[0]['districts'][0]['id'];

      // @ts-ignore
      this.selectedWard = new BehaviorSubject<Ward>(this.cityOptions[0]['districts'][0]['wards'][0]);
      // @ts-ignore
      this.selectedWardId = this.cityOptions[0]['districts'][0]['wards'][0]['id'];

      this.selectedCity.subscribe(city => {
        // @ts-ignore
        Object.entries(city['districts']).forEach(([subKey, district]) => {
          this.districtOptions[+subKey] = <District>district;
        })

        console.log(this.districtOptions)
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
}
