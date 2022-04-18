import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-small-image-wrapper',
  templateUrl: './small-image-wrapper.component.html',
  styleUrls: ['./small-image-wrapper.component.scss']
})
export class SmallImageWrapperComponent implements OnInit {

  @Input() image: string = ''
  @Input() hasImage = false
  @Input() checked = false
  constructor() { }

  ngOnInit(): void {
  }

}
