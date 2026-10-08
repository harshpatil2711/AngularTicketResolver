import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tickets' },
  {
    path: 'tickets',
    loadComponent: () => import('./pages/ticket/ticket').then(m => m.Ticket),
    children: [
      { path: '', loadComponent: () => import('./pages/ticket/ticket-list/ticket-list').then(m => m.TicketList) }
    ]
  },
  { path: '**', redirectTo: 'tickets' },
];
