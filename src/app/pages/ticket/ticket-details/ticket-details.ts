import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TicketService } from '../service/ticket.service';
import {
  TicketCategory,
  TicketDetail,
  TicketEditRequest,
  TicketPriority,
} from '../models/ticket.model';
import { TicketEdit } from '../ticket-edit/ticket-edit';

export interface TicketDetailsData {
  ticketId: number;
  categories: TicketCategory[];
  priorities: TicketPriority[];
}

@Component({
  selector: 'app-ticket-details',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
    TicketEdit,
  ],
  styleUrl: './ticket-details.css',
  templateUrl: './ticket-details.html',
})
export class TicketDetails {
  private readonly service = inject(TicketService);
  private readonly dialogRef = inject<MatDialogRef<TicketDetails>>(MatDialogRef);
  readonly data = inject<TicketDetailsData>(MAT_DIALOG_DATA);

  readonly detail = signal<TicketDetail | null>(null);
  readonly categories = signal<TicketCategory[]>(this.data.categories ?? []);
  readonly priorities = signal<TicketPriority[]>(this.data.priorities ?? []);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly editing = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.service.getById(this.data.ticketId).subscribe({
      next: (r) => {
        this.detail.set(r.ticket);
        this.categories.set(r.categories ?? this.categories());
        this.priorities.set(r.priorities ?? this.priorities());
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load ticket details.');
        this.loading.set(false);
      },
    });
  }

  onEdit(): void {
    this.editing.set(true);
  }

  onCancelEdit(): void {
    this.editing.set(false);
  }

  onSave(request: TicketEditRequest): void {
    this.saving.set(true);
    this.service.update(request).subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogRef.close(true);
      },
      error: () => {
        this.error.set('Failed to update ticket.');
        this.saving.set(false);
      },
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}