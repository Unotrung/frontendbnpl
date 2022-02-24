import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appMarginTop]'
})
export class MarginTopDirective implements OnInit{
  @Input() appMarginTop = '' ;
  constructor(private  el: ElementRef) {

  }

  ngOnInit(): void {
    this.el.nativeElement.style.marginTop = `${this.appMarginTop}px`;
  }

}
