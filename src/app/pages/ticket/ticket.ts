import { Component } from '@angular/core';
import { TicketList } from './ticket-list/ticket-list';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [TicketList],
templateUrl: './ticket.html',
  styleUrl: './ticket.css'
})
export class Ticket {}
