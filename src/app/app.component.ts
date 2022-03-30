import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'multiLang';
  supportLanguages = ['en', 'vi']
   langControl: FormControl
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(this.supportLanguages)
    this.translateService.setDefaultLang('vi');
    const browserLang = this.translateService.getBrowserLang()
    this.translateService.use(browserLang || 'vi')
    this.langControl = new FormControl({value:null})
    this.langControl.setValue(browserLang || 'vi', {onlySelf: true})
    this.langControl.valueChanges.subscribe(value => {
      this.translateService.use(value)
    })
  }
}
