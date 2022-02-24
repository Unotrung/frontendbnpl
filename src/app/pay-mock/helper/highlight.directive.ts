import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {

    constructor(private el: ElementRef) {
        console.log(this.appHighlight);
    }

    @Input() defaultColor = '';

    @Input() appHighlight = '';

    @HostListener('mouseenter') onMouseEnter() {
        console.log(this.appHighlight)
        this.highlight(this.appHighlight || this.defaultColor || 'red');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('');
    }


    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/