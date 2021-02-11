import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Store,select } from '@ngrx/store';
import { Payment } from '../models/payment.model';
import { Observable } from 'rxjs';
import { payment } from '../payment.reducer';
import { submit } from '../payment.actions';

export interface Months {
  [key: number]: string[];
}

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;

  currentYear = new Date();
  years:number[] = [];
  NewMonth:string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  months:Months = {}
  creditcard$: Observable<Payment>;
  payment : Payment = {card: {}, amount:0.00};


  constructor(private service: PaymentService,private store: Store<Payment>) {
    
    this.paymentForm = new FormGroup( {
      cardNumber: new FormControl('', [Validators.required,Validators.pattern('^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$')]),
      name: new FormControl('', [Validators.required]),
      expMonth: new FormControl('', [Validators.required]),
      expYear: new FormControl(null, [Validators.required]),
      cvv: new FormControl('',[Validators.minLength(3),Validators.pattern('[0-9]+')]),
      amount: new FormControl(null, [Validators.required]),
    });
   
    this.creditcard$ = this.store.pipe(select(payment));

    
  }

  ngOnInit(): void {
    this.prepareExpiration();
    this.store.select(payment).subscribe(data => 
      {
        this.payment = data;        
        console.log("here", this.payment);
      })
  }

  prepareExpiration() {

    let months:string[] = [];
    let monthVal = 2;
    for(let i = 0; i<= 11; i++) {
      let year = this.currentYear.getFullYear()+i;
      this.years.push(year);


      months.push(("0" + (this.currentYear.getMonth() +1+i)).slice(-2));
      this.months[year] = months;

      /*if(year == this.currentYear.getFullYear()) {

        this.months[year].forEach(element => {
          console.log("element",element);
        });
      }*/
      
    }
    console.log("this.months", this.months);
    console.log("this.year", this.years);
  }

  pay() {
    let cardNumber:number = (this.paymentForm.get('cardNumber')?.value) ? Number(this.paymentForm.get('cardNumber')?.value) : 0;
    let name:string = (this.paymentForm.get('name')?.value) ? this.paymentForm.get('name')?.value : "";
    let expMonth:string = (this.paymentForm.get('expMonth')?.value) ? this.paymentForm.get('expMonth')?.value  : "";
    let expYear:string = (this.paymentForm.get('expYear')?.value) ? this.paymentForm.get('expYear')?.value  : "";
    let cvv:string = (this.paymentForm.get('cvv')?.value) ? this.paymentForm.get('cvv')?.value : "";
    let amount:number = (this.paymentForm.get('amount')?.value) ? this.paymentForm.get('amount')?.value : "";

    const card:Payment = {
      card: {
        cardNumber:cardNumber,
        name:name,
        expMonth:expMonth,
        expYear:expYear,
        cvv:cvv
      },
      amount: amount
    }
    this.store.dispatch(submit(card));

    console.log("creditcard$",this.creditcard$);
    /*this.service.pay(this.paymentForm.value).subscribe(response => {

    });*/
  }


}
