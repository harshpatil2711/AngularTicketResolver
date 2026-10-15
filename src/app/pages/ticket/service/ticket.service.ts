import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TicketDetailResult,
  TicketEditRequest,
  TicketListItem,
  TicketListRequest,
  TicketSearchResult,
  TicketUpdateResult,
} from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  list(request: TicketListRequest): Observable<TicketSearchResult<TicketListItem>> {
    return this.http.post<TicketSearchResult<TicketListItem>>(`${this.base}/tickets/list`, request);
  }

  getById(ticketId: number): Observable<TicketDetailResult> {
    return this.http.get<TicketDetailResult>(`${this.base}/tickets/${ticketId}`);
  }

  update(request: TicketEditRequest): Observable<TicketUpdateResult> {
    return this.http.post<TicketUpdateResult>(`${this.base}/tickets/update`, request);
  }
}
