
import { createAction } from '@ngrx/store';
import { Payment } from './models/payment.model';

export const submit = createAction( '[Payment] Credit Card', (payment: Payment) => ({payment}));