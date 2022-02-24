import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appMarginTop]'
})
export class MarginTopDirective {
  @Input() appMarginTop = '' ;
  constructor(private  el: ElementRef) {
    console.log('abc')
    console.log(this.appMarginTop);
      el.nativeElement.style.marginTop = `${this.appMarginTop}px`;
  }

}
