import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/receipts', pathMatch: 'full' },
  { path: 'receipts', loadComponent: () => import('./components/receipt-list/receipt-list.component').then(m => m.ReceiptListComponent) },
  { path: 'receipts/new', loadComponent: () => import('./components/receipt-form/receipt-form.component').then(m => m.ReceiptFormComponent) },
  { path: '**', redirectTo: '/receipts' }
];
