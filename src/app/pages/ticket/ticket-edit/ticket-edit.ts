import { Component, computed, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  TicketCategory,
  TicketDetail,
  TicketEditRequest,
  TicketPriority,
} from '../models/ticket.model';

@Component({
  selector: 'app-ticket-edit',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  styleUrl: './ticket-edit.css',
  templateUrl: './ticket-edit.html',
})
export class TicketEdit {
  readonly detail = input.required<TicketDetail>();
  readonly categories = input<TicketCategory[]>([]);
  readonly priorities = input<TicketPriority[]>([]);

  readonly subject = linkedSignal(() => this.detail().subject);
  readonly description = linkedSignal(() => this.detail().description);
  readonly categoryId = linkedSignal(() => this.detail().categoryId);
  readonly priorityId = linkedSignal(() => this.detail().priorityId);

  readonly save = output<TicketEditRequest>();
  readonly cancel = output<void>();

  readonly canSave = computed(
    () =>
      this.subject().trim().length > 0 &&
      this.description().trim().length > 0 &&
      this.categoryId() > 0 &&
      this.priorityId() > 0,
  );

  onSave(): void {
    if (!this.canSave()) {
      return;
    }

    this.save.emit({
      ticketId: this.detail().ticketId,
      subject: this.subject().trim(),
      description: this.description().trim(),
      categoryId: this.categoryId(),
      priorityId: this.priorityId(),
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}