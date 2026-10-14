import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  TicketCategory,
  TicketFilterCriteria,
  TicketPriority,
  TicketStatus,
} from '../models/ticket.model';

@Component({
  selector: 'app-filters',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  styleUrl: './filters.css',
  templateUrl: './filters.html',
})
export class Filters {
  readonly categories = input<TicketCategory[]>([]);
  readonly priorities = input<TicketPriority[]>([]);
  readonly statuses = input<TicketStatus[]>([]);

  readonly searchTerm = signal('');
  readonly categoryId = signal<number | null>(null);
  readonly priorityId = signal<number | null>(null);
  readonly statusId = signal<number | null>(null);

  readonly search = output<TicketFilterCriteria>();
  readonly clear = output<void>();

  onSearch(): void {
    this.search.emit({
      searchTerm: this.searchTerm().trim() || null,
      categoryId: this.categoryId(),
      priorityId: this.priorityId(),
      statusId: this.statusId(),
    });
  }

  onClear(): void {
    this.searchTerm.set('');
    this.categoryId.set(null);
    this.priorityId.set(null);
    this.statusId.set(null);
    this.clear.emit();
  }
}