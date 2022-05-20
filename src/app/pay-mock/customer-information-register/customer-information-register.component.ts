import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {LocationAddressService} from "../location-address.service";
import {BehaviorSubject, map, Observable, startWith} from "rxjs";
import {City, District, Ward} from "../vietnamLocation";
import {Router} from "@angular/router";
import {CustomerInformationService} from "../customer-information.service";
import {AuthBnplService} from "../auth-bnpl.service";
import {Step} from "../step";
import {PictureService} from "../picture.service";
import {checkInfo} from "../helper/helper";
import {keyPress} from "../helper/helper";
import {InputType} from "../user";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../language.service";

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
  personalTitleOptionsEn!: string[]
  sexOptions!: string[]
  sexOptionsEn!: string[]


  vietnamLocationData: any;
  selectedCity$! : BehaviorSubject<City>;
  selectedDistrict$!: BehaviorSubject<District>;
  selectedWard$!: BehaviorSubject<Ward>;
  selectedStreet$!: BehaviorSubject<any>;

  initCity = {
    city: '',
    success: false
  }
  initDistrict = {
    district: '',
    success: false
  }
  initWard = {
    ward: '',
    prefix: '',
    success: false
  }
  initStreet = {
    street: '',
    success: false
  }
  name = ''
  birthday = ''
  issueDay = ''
  citizenId = ''
  lang =''

  checkInfo = checkInfo
  keyPress = keyPress
  InputType = InputType

  constructor(
      private locationAddressService: LocationAddressService,
      private customerInformationService: CustomerInformationService,
      private authService: AuthBnplService,
      private router: Router,
      private pictureService: PictureService,
      private translateService: TranslateService,
      private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.languageService.lang$.subscribe(x=>this.lang = x);
    this.initFormInfo();
    // this.registerForm = new FormGroup({
    //   name: new FormControl(''),
    //   sex: new FormControl('', [Validators.required]),
    //   phone: new FormControl(''),
    //   birthday: new FormControl(''),
    //   citizenId: new FormControl(''),
    //   issueDate: new FormControl(''),
    //   city: new FormControl({value: this.initCity.success ? this.initCity.city : '', disabled: this.initCity.success},
    //       [Validators.required]),
    //   district: new FormControl({value: this.initDistrict.success ? this.initDistrict.district : '', disabled: this.initDistrict.success},
    //       [Validators.required]),
    //   ward: new FormControl({value: this.initWard.success ? this.initWard.ward : '', disabled: this.initWard.success},
    //       [Validators.required]),
    //   street: new FormControl({value: this.initStreet.success ? this.initStreet.street: '', disabled: this.initStreet.success},
    //       [Validators.required]),
    //   personal_title_ref: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    //   name_ref: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    //   phone_ref: new FormControl('', {validators: [Validators.required, Validators.pattern(/^(09|03|07|08|05)+([0-9]{8}$)/g),
    //       Validators.minLength(10), Validators.maxLength(10)], updateOn: 'blur'})
    // })

    // this.f['phone'].setValue(this.authService.user$.getValue().phone);
    // this.f['citizenId'].setValue(this.authService.user$.getValue().citizenId);

  }

  initFormInfo() {

    // this.personalTitleOptions = [this.translateService.instant("customer.father"),
    //   this.translateService.instant("customer.mother"),
    //   this.translateService.instant("customer.brother"),
    //   this.translateService.instant("customer.sister"),
    //   this.translateService.instant("customer.son"),
    //   this.translateService.instant("customer.daughter"),
    //   this.translateService.instant("customer.spouse"),
    //   this.translateService.instant("customer.other"),]
    this.personalTitleOptions = ["Bố","Mẹ","Anh em trai","Chị em gái","Con trai","Con gái","Vợ chồng","Quan hệ khác"];
    this.personalTitleOptionsEn = ["Father","Mother","Brother","Sister","Son","Daughter","Spouse","Other family relationship"];
    this.sexOptions = ['Nữ', 'Nam'];
    this.sexOptionsEn = ['Male', 'Female'];

    const citizenFrontData = this.pictureService.citizenFrontData$.getValue()
    const citizenBackData = this.pictureService.citizenBackData$.getValue()
    console.log('front data', citizenFrontData)
    console.log('back data', citizenBackData)
    let name = '', gender = '', birthday = '', issueDay = '', citizenId = '', phone = ''
    if ('name' in citizenFrontData) {
      this.name = name = this.checkInfo(citizenFrontData['name']).value
    }
    if ('gender' in citizenFrontData) {
      gender = (this.checkInfo(citizenFrontData['gender']).value === 'F') ? 'Nữ':
          this.checkInfo(citizenFrontData['gender']).value === 'M' ? 'Nam' : ''
    }
    if ('dob' in citizenFrontData) {
      this.birthday = birthday = this.convertDateString(this.checkInfo(citizenFrontData['dob']).value)
    }
    if ('doi' in citizenBackData) {
      this.issueDay = issueDay = this.convertDateString(this.checkInfo(citizenBackData['doi']).value)
    }
    if ('idNumber' in citizenFrontData) {
      this.citizenId = citizenId = this.checkInfo(citizenFrontData['idNumber']).value
    }

     phone = this.authService.user$.getValue().phone!

    //address splitter
    const fullAddress = this.checkInfo(citizenFrontData['permanentAddress']).value
    const addressParts = fullAddress.split(',')
    console.log('address parts',addressParts)
    const addressLength = addressParts.length
    let city = ''
    let district = ''
    let ward = ''
    let wardStreet = ''
    if (addressLength >= 3) {
      city = addressParts[addressLength - 1]
      district = addressParts[addressLength - 2]
      if (addressLength >= 4) {
        ward = addressParts[addressLength-3]
      }
      wardStreet = addressParts[0]
    }
    // console.log(city)
    // console.log(district)
    // console.log(wardStreet)

    let initCity: City
    let initDistrict: District
    let initWard: Ward
    let initStreet = ''
    this.locationAddressService.getJSON().subscribe(data => {
      this.vietnamLocationData = data as any[];
      Object.entries(this.vietnamLocationData).forEach(
          ([key, value]) => {
            // data have extra field with value = 63, so
            if (value !== 63 && key !== 'default') {
              this.cityOptions[+key] = <City>value
              // @ts-ignore
              if (city.toLowerCase().indexOf(<City>value.name.toLowerCase()) > -1) {
                initCity = <City>value
                // console.log(initCity)
              }
            }
          }
      );
      if (initCity === undefined) {
        initCity = this.cityOptions[0]
      }
      else {
        this.initCity = {
          success: true,
          city: initCity.name
        }
      }

      this.selectedCity$ = new BehaviorSubject<City>(initCity)
      Object.entries(this.selectedCity$.getValue().districts).forEach(([key, value]) => {
        // @ts-ignore
        if (district.toLowerCase().indexOf(<District>value.name.toLowerCase()) > -1){
          initDistrict = value
          // console.log(initDistrict)
        }
      })

      // @ts-ignore
      if(initDistrict === undefined) {
        initDistrict = this.selectedCity$.getValue().districts[0]
      }
      else {
        // this.initDistrict = true
        this.initDistrict = {
          success: true,
          district: initDistrict.name
        }
      }
      this.selectedDistrict$ = new BehaviorSubject<District>(initDistrict);

      Object.entries(this.selectedDistrict$.getValue().wards).forEach(([key, value]) => {
        if (ward) {
          // @ts-ignore
          if (ward.toLowerCase().indexOf(<Ward>value.name.toLowerCase()) > -1){
            initWard = value
            // console.log(initWard)
          }
        }
        else { // @ts-ignore
          if (wardStreet.toLowerCase().indexOf(<Ward>value.name.toLowerCase()) > -1){
                    initWard = value
                    // console.log(initWard)
          }
        }
      })

      if (initWard === undefined) {
        initStreet = this.spitStreetFromStreetWard(wardStreet);
        initWard = this.selectedDistrict$.getValue().wards[0]
      } else {
        this.initWard = {
          success: true,
          ward: initWard.name,
          prefix: initWard.prefix
        }

        if (addressLength >= 4) {
          initStreet = wardStreet
        } else {
          initStreet = this.spitStreetFromStreetWard(wardStreet, initWard.name)
        }

         this.initStreet = {
          success: true,
           street: initStreet
         }
      }

      // @ts-ignore
      this.selectedWard$ = new BehaviorSubject<Ward>(initWard);

      this.selectedCity$.subscribe(city => {
        // @ts-ignore
        Object.entries(city['districts']).forEach(([subKey, district]) => {
          this.districtOptions[+subKey] = <District>district;
        })
        // console.log(this.districtOptions)
      })


      this.selectedDistrict$.subscribe(district => {
        // @ts-ignore
        Object.entries(district['wards']).forEach(([key, ward]) => {
          this.wardOptions[+key] = <Ward>ward;
        })
      })


      this.registerForm = new FormGroup({
        name: new FormControl({value: name, disabled: true}),
        sex: new FormControl({ value: gender, disabled: gender ? true : false}, [Validators.required]),
        phone: new FormControl({value: phone, disabled: true}),
        birthday: new FormControl({value:birthday, disabled: true}),
        citizenId: new FormControl({value: citizenId, disabled: true}),
        issueDate: new FormControl({value: issueDay, disabled: true}),
        city: new FormControl({value: this.initCity.success ? this.initCity.city : '', disabled: this.initCity.success},
            [Validators.required]),
        district: new FormControl({value: this.initDistrict.success ? this.initDistrict.district : '', disabled: this.initDistrict.success},
            [Validators.required]),
        ward: new FormControl({value: this.initWard.success ? this.initWard.ward : '', disabled: this.initWard.success},
            [Validators.required]),
        street: new FormControl({value: this.initStreet.success ? this.initStreet.street: '', disabled: this.initStreet.success},
            [Validators.required]),
        personal_title_ref: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
        name_ref: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
        phone_ref: new FormControl('', {
          validators: [Validators.required,
            Validators.minLength(10),
            Validators.maxLength(11),
            Validators.pattern(/^(0)+(([0-9]{10}|([0-9]{9}))$)/),
            this.validatorRefPhone(phone)
          ],
          updateOn: 'blur'})
      })
      // this.f['phone_ref'].valueChanges.subscribe(value => {
      //   if (value.length > 11) {
      //     this.f['phone_ref'].setValue(value.slice(0,11))
      //   }
      // })

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
      this.personalTitleFilterOptions = this.f['personal_title_ref'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, 'personal_title_ref'))
      )
    })
  }

  // checkInfo(review: any): ({confirm: boolean, value: string }){
  //   const value = review ? review['value']: ''
  //   const needReview = review ? review['to-be-reviewed'] : 'no'
  //   if (!value) return {confirm: false, value: ''}
  //   if (needReview === 'no') {
  //     return {confirm: true, value}
  //   }
  //   else {
  //     return {confirm: false, value: ''}
  //   }
  // }

  // this function convert string date dd-mm-yyyy to yyyy-mm-dd
  convertDateString(dateString: string): string {
    if (dateString === '') return ''
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
  }

  spitStreetFromStreetWard(streetWard: string, ward?: string): string {
    if (ward) {
      const lastIndex = streetWard.toLowerCase().lastIndexOf(ward.toLowerCase());
      streetWard = streetWard.substring(0, lastIndex)
    }
    let wardStreetParts = streetWard.split(' ')
    const lastWord = wardStreetParts[wardStreetParts.length - 1].toLowerCase()
    if (lastWord === 'xã' || lastWord === 'phường'){
      wardStreetParts.pop()
    }
    if (lastWord === 'trấn') {
      wardStreetParts.pop()
      wardStreetParts.pop()
    }
    wardStreetParts.forEach((word, index) => {
      if (word && !/\d/.test(word)) {
        word = word[0].toUpperCase() + word.substring(1).toLowerCase()
        wardStreetParts[index] = word
      }
    } )
    return wardStreetParts.join(' ').trim()
  }

  private _filter(value: string, zone: string): string[] {
    console.log('start filter')
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
    if (zone === 'personal_title_ref') {
      return this.personalTitleOptions.filter(option => option.toLowerCase().includes(filterValue))
    }
    return []
  }

  // keyPress(event: any, type: string) {
  //   const pattern = /[0-9]/;
  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }

  get f(): {
    [key: string]: AbstractControl;
  } { return this.registerForm.controls; }

  onSelectedCity(city: string){
    this.districtOptions.length = 0;
    this.cityOptions.forEach((value, index) => {
      if (city === value.name){
        this.selectedCity$.next(value);
        this.f['district'].setValue('');
      }
    })

  }

  onSelectedDistrict(district: string) {
    this.wardOptions.length = 0;
    this.districtOptions.forEach((value, index) => {
      if (district === value.name) {
        this.selectedDistrict$.next(value);
        this.f['ward'].setValue('');
      }
    })
  }
  onSelectedWard(ward: string) {
    this.wardOptions.forEach((value, index) => {
      if (ward === value.name) {
        this.selectedWard$.next(value)
      }
    })
  }

  validatorRefPhone(phone: string ): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => phone === control.value ? {'phoneDuplicate': true} : null
  }

  onContinue() {
    this.authService.registerStep$.next(Step.customerConfirmInfo)


    this.customerInformationService.customerInfo$.next({
    // @ts-ignore
      name: this.name,
      sex: this.handleValueGender(this.f['sex'].value),
      phone: this.authService.user$.getValue().phone,
      birthday: new Date(this.birthday),
      citizenId: this.f['citizenId'].value,
      issueDate: new Date(this.issueDay),

      city: this.initCity.success ? this.initCity.city : this.f['city'].value,
      district: this.initDistrict.success ? this.initDistrict.district : this.f['district'].value,
      ward: this.initWard.success ? `${this.initWard.prefix} ${this.initWard.ward}` : `${this.selectedWard$.getValue().prefix} ${this.f['ward'].value}`,
      street: this.initStreet.success ? this.initStreet.street : this.f['street'].value,

      personal_title_ref: this.handleValueRelationship(this.f['personal_title_ref'].value),
      name_ref: this.f['name_ref'].value,
      phone_ref: this.f['phone_ref'].value
    })

    this.router.navigate(['/pay-mock/customer-confirm-info']).then();
  }

  handleValueGender(gender:string): string{
    let genderFormat = '';
    if (gender == 'Male') {
      genderFormat = 'Nam'
    } else if (gender == "Female") {
      genderFormat = "Nữ"
    } else {
      genderFormat = gender;
    }
    return genderFormat
  }

  handleValueRelationship(relationship: string): string {
    let relationshipFormat = relationship;
    let listRelVi = [...this.personalTitleOptions];
    this.personalTitleOptionsEn.forEach(function (rel,index) {
      if (relationship == rel) {
        relationshipFormat = listRelVi[index]
      }
    })
    return  relationshipFormat;
  }
}
