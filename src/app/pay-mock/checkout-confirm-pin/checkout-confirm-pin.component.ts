import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LoadingService} from "../loading.service";
import {AuthBnplService} from "../auth-bnpl.service";
import {CheckoutService} from "../checkout.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {VerifyPinChildComponent} from "../verify-pin-child/verify-pin-child.component";

@Component({
    selector: 'app-checkout-confirm-pin',
    templateUrl: './checkout-confirm-pin.component.html',
    styleUrls: ['./checkout-confirm-pin.component.scss']
})
export class CheckoutConfirmPinComponent implements OnInit {

    @ViewChild(VerifyPinChildComponent) pinChild!: VerifyPinChildComponent
    pinCode$: BehaviorSubject<string>
    pinFails = 0

    constructor(
        private loadingService: LoadingService,
        private authService: AuthBnplService,
        private checkoutService: CheckoutService,
        private router: Router,
        private dialogRef: MatDialogRef<CheckoutConfirmPinComponent>,
    ) {
        this.pinCode$ = new BehaviorSubject<string>('')
        this.pinCode$.subscribe(pin => {
            if (pin.length === 4) {
                if (this.pinFails >= 5) {
                    return
                }
                this.authService.user$.next({...this.authService.user$.getValue(), pin: this.pinCode$.getValue()})
                this.loadingService.loading$.next(true)
                this.authService.login().subscribe({
                    next: data => {
                        console.log(data)
                        //todo: api call for payment
                        this.loadingService.loading$.next(false)
                        if (data['status']) {
                            this.checkoutService.checkoutFinish$.next(true)
                            this.router.navigate(['/pay-mock/checkout-finish']).then(() => {
                                this.dialogRef.close()
                            })
                        } else {
                            this.pinFails++
                            this.pinChild.resetCode()
                            // this.checkoutService.checkoutFinish$.next(false)
                        }
                    },
                    error: ({error}) => {
                        console.log(error)
                        this.loadingService.loading$.next(false)
                        this.pinFails++
                        this.pinChild.resetCode()
                        // this.checkoutService.checkoutFinish$.next(false)
                        // this.router.navigate(['/pay-mock/checkout-finish']).then()
                    },
                    complete: () => {
                    }
                })
            }
        })
    }

    ngOnInit(): void {
    }

    onPinCodeChange(event: string) {
        this.pinCode$.next(event)
    }

}
