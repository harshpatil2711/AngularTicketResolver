import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Filters } from '../filters/filters';
import { TicketDetails } from '../ticket-details/ticket-details';
import { TicketService } from '../service/ticket.service';
import {
  TicketCategory,
  TicketFilterCriteria,
  TicketListItem,
  TicketPriority,
  TicketStatus,
} from '../models/ticket.model';

@Component({
  selector: 'app-ticket-list',
  styleUrl: './ticket-list.css',
  templateUrl: './ticket-list.html',
  imports: [MatPaginatorModule, MatButtonModule, MatIconModule, MatDialogModule, Filters]
})
export class TicketList implements OnInit {
  private readonly service = inject(TicketService);
  private readonly dialog = inject(MatDialog);
  readonly items = signal<TicketListItem[]>([]);
  readonly total = signal(0);
  readonly pageSize = signal(10);
  readonly pageIndex = signal(0);
  readonly categories = signal<TicketCategory[]>([]);
  readonly priorities = signal<TicketPriority[]>([]);
  readonly statuses = signal<TicketStatus[]>([]);
  private readonly criteria = signal<TicketFilterCriteria>({});

  ngOnInit(): void {
    this.load();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.load();
  }

  onCriteria(criteria: TicketFilterCriteria): void {
    this.criteria.set(criteria);
    this.pageIndex.set(0);
    this.load();
  }

  onClear(): void {
    this.criteria.set({});
    this.pageIndex.set(0);
    this.load();
  }

  openDetails(ticket: TicketListItem): void {
    this.dialog
      .open(TicketDetails, {
        data: {
          ticketId: ticket.ticketId,
          categories: this.categories(),
          priorities: this.priorities(),
        },
        width: '640px',
        maxWidth: '95vw',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) {
          this.load();
        }
      });
  }

  private load(): void {
    this.service
      .list({
        ...this.criteria(),
        page: this.pageIndex() + 1,
        size: this.pageSize(),
      })
      .subscribe({
        next: (r) => {
          this.items.set(r.items);
          this.total.set(r.totalCount);
          this.categories.set(r.categories);
          this.priorities.set(r.priorities);
          this.statuses.set(r.statuses);
        },
        error: (e) => console.error(e),
      });
  }
}
