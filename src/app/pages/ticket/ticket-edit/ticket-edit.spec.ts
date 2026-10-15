import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketDetail } from '../models/ticket.model';
import { TicketEdit } from './ticket-edit';

describe('TicketEdit', () => {
  let component: TicketEdit;
  let fixture: ComponentFixture<TicketEdit>;

  const detail: TicketDetail = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketEdit);
    fixture.componentRef.setInput('detail', detail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prefill values from the detail', () => {
    expect(component.subject()).toBe('Printer down');
    expect(component.categoryId()).toBe(2);
    expect(component.canSave()).toBe(true);
  });

  it('should emit the edit request on save', () => {
    component.subject.set('Printer jam');
    component.priorityId.set(2);

    let emitted: unknown;
    component.save.subscribe((v) => (emitted = v));
    component.onSave();

    expect(emitted).toEqual({
      ticketId: 1,
      subject: 'Printer jam',
      description: 'No paper',
      categoryId: 2,
      priorityId: 2,
    });
  });
});