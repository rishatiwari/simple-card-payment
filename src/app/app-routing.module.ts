import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentConfirmationComponent } from "./payment-confirmation/payment-confirmation.component";

const routes: Routes = [
  { path: '', component: PaymentFormComponent },
  { path: 'payment-confirmation/:amount', component: PaymentConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
