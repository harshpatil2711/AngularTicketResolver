import { Component, inject, OnInit, signal } from '@angular/core';
import { TicketService } from '../service/ticket.service';
import { TicketListItem } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  styleUrl: './ticket-list.css',
  templateUrl: './ticket-list.html',
})
export class TicketList implements OnInit {
  private readonly service = inject(TicketService);
  readonly items = signal<TicketListItem[]>([]);

  ngOnInit(): void {
    this.service.list({ page: 1, size: 10 }).subscribe({
      next: (r) => this.items.set(r.items),
      error: (e) => console.error(e),
    });
  }
}