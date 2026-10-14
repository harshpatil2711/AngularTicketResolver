import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Ticket } from './ticket';
import { TicketService } from './service/ticket.service';

describe('Ticket', () => {
  let component: Ticket;
  let fixture: ComponentFixture<Ticket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ticket],
      providers: [
        {
          provide: TicketService,
          useValue: {
            list: () =>
              of({
                items: [],
                totalCount: 0,
                page: 1,
                size: 10,
                totalPages: 0,
                categories: [],
                priorities: [],
                statuses: [],
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Ticket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
