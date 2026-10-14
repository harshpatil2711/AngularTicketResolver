import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketListItem, TicketSearchResult, TicketListRequest } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  list(request: TicketListRequest): Observable<TicketSearchResult<TicketListItem>> {
    return this.http.post<TicketSearchResult<TicketListItem>>(`${this.base}/tickets/list`, request);
  }
}
