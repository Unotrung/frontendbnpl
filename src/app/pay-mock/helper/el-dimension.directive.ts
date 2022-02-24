import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appElDimension]'
})
export class ElDimensionDirective implements OnInit{

  @Input() width = ''
  @Input() height = ''

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.style.width = `${this.width}px`;
    this.el.nativeElement.style.height = `${this.height}px`;
  }
}
