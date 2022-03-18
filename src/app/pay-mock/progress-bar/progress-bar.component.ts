import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() set progress(value: number) {
    if ( value <= 0) { value = 0}
    if ( value >= 100) { value = 100}
    this._progress = value
  }
  get progress(): number {
    return this._progress
  }
  private _progress: number = 0
  constructor() { }

  ngOnInit(): void {
  }


}
