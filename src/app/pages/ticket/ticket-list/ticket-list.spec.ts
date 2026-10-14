import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TicketService } from '../service/ticket.service';
import { TicketList } from './ticket-list';

describe('TicketList', () => {
  let component: TicketList;
  let fixture: ComponentFixture<TicketList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketList],
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

    fixture = TestBed.createComponent(TicketList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});