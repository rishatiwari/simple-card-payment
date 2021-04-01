import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  amount:string | null = "";

  ngOnInit(): void {
    this.amount = this.route.snapshot.paramMap.get("amount");
    console.log("this.amount",this.amount);
  }

}
