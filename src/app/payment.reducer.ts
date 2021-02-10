import { createReducer, on,Action ,ActionReducerMap,MetaReducer} from '@ngrx/store';
import { Payment } from './models/payment.model';
import { submit } from './payment.actions';
import { environment } from '../environments/environment';

 
export const initialState: Payment|null = {card: {}, amount: 0.00};
 
export const _updateCard = createReducer(
    initialState,
    on(submit, (state: Payment | null, {payment}) => (payment))
  );
 
export function reducer(state: Payment | undefined, action: Action): any {
    return _updateCard(state, action);
  }

export const payment = (state: Payment) => state;

export const reducers: ActionReducerMap<Payment>|null = null;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];