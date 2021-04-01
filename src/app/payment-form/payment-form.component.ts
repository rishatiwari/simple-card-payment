import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Router, NavigationEnd } from '@angular/router';

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
  loading:boolean = false;
  currentYear = new Date();
  years:number[] = [];
  NewMonth:string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  months:Months = {};


  constructor(private service: PaymentService,private router: Router) {

    this.paymentForm = new FormGroup( {
      cardNumber: new FormControl('', [Validators.required,Validators.pattern('^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$')]),
      name: new FormControl('', [Validators.required]),
      expMonth: new FormControl('', [Validators.required]),
      expYear: new FormControl(null, [Validators.required]),
      cvv: new FormControl('',[Validators.maxLength(3)]),
      amount: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.prepareExpiration();
  }

  getMethods(obj:any) {
    var result = [];
    for (var id in obj) {
      try {
        if (typeof(obj[id]) == "function") {
          result.push(id + ": " + obj[id].toString());
        }
      } catch (err) {
        result.push(id + ": inaccessible");
      }
    }
    return result;
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
  }

  pay() {
    this.loading = true;
    let amount:number = (this.paymentForm.get('amount')?.value) ? this.paymentForm.get('amount')?.value : "";

    /*const card:Payment = {
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
    console.log("creditcard$",this.payment$);*/
    /*this.service.pay(this.paymentForm.value).subscribe(response => {

    });*/

    setTimeout (() => {
      this.loading = false;
      this.router.navigate(['/payment-confirmation', amount]);
    }, 1000*6);

  }


}
