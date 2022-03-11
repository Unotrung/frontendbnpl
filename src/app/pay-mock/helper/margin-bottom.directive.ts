import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appMarginBottom]'
})
export class MarginBottomDirective implements OnInit{
  @Input() appMarginBottom = '';

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.el.nativeElement.style.marginBottom = `${this.appMarginBottom}px`;
  }

}
