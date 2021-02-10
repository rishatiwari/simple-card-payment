import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Payment } from './models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  pay(payment:Payment):Observable<any>  {
    // TODO: add Test Service
    return this.http.post(this.apiUrl + '/api/pay/', payment);
  }
}
