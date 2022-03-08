import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {LoadingService} from "../loading.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @HostBinding('style.display') display = ''
  constructor(private loadingService: LoadingService) {

  }

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(loading => {
      if (loading) {
        this.display = 'absolute'
      }
      else {
        this.display = 'none'
      }
    })
  }

}
