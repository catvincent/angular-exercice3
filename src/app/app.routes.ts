import { Routes } from '@angular/router';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

export const routes: Routes = [

    { path: 'transaction-detail/:id', component: TransactionDetailComponent },

];
