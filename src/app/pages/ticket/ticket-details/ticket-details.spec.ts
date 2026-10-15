import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TicketService } from '../service/ticket.service';
import { TicketDetails, TicketDetailsData } from './ticket-details';

describe('TicketDetails', () => {
  let component: TicketDetails;
  let fixture: ComponentFixture<TicketDetails>;

  const data: TicketDetailsData = { ticketId: 1, categories: [], priorities: [] };

  const detailResult = {
    ticket: {
      ticketId: 1,
      ticketNumber: 'INC-1',
      subject: 'Printer down',
      description: 'No paper',
      categoryId: 2,
      categoryName: 'Hardware',
      priorityId: 1,
      priorityName: 'High',
      statusId: 3,
      statusName: 'Open',
      isTerminalState: false,
      createdBy: 7,
      createdByName: 'Ravi',
      assignedTo: null,
      assignedToName: null,
      createdDate: '2026-01-01',
      resolvedDate: null,
    },
    categories: [{ categoryId: 2, categoryName: 'Hardware' }],
    priorities: [{ priorityId: 1, priorityName: 'High', sequence: 1 }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDetails],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: TicketService, useValue: { getById: () => of(detailResult) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load the detail', () => {
    expect(component).toBeTruthy();
    expect(component.detail()?.ticketNumber).toBe('INC-1');
    expect(component.categories().length).toBe(1);
  });

  it('should toggle edit mode', () => {
    expect(component.editing()).toBe(false);
    component.onEdit();
    expect(component.editing()).toBe(true);
    component.onCancelEdit();
    expect(component.editing()).toBe(false);
  });
});