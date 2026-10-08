import { Component, inject, OnInit, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TicketService } from '../service/ticket.service';
import { TicketListItem } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  styleUrl: './ticket-list.css',
  templateUrl: './ticket-list.html',
  imports: [MatPaginatorModule]
})
export class TicketList implements OnInit {
  private readonly service = inject(TicketService);
  readonly items = signal<TicketListItem[]>([]);
  readonly total = signal(0);
  readonly pageSize = signal(10);
  readonly pageIndex = signal(0);

  ngOnInit(): void {
    this.load();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.load();
  }

  private load(): void {
    this.service.list({ page: this.pageIndex() + 1, size: this.pageSize() }).subscribe({
      next: (r) => {
        this.items.set(r.items);
        this.total.set(r.totalCount);
      },
      error: (e) => console.error(e),
    });
  }
}