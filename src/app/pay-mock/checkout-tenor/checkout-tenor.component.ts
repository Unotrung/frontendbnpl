import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tenor} from "../tenor";

@Component({
  selector: 'app-checkout-tenor',
  templateUrl: './checkout-tenor.component.html',
  styleUrls: ['./checkout-tenor.component.scss']
})
export class CheckoutTenorComponent implements OnInit {

  @Input() tenor!: Tenor
  @Input() checked!: boolean
  @Output() chosenTenor = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }
  onTenorClick() {
    this.checked = true;
    this.chosenTenor.emit(this.tenor.tenorId)
  }

}
