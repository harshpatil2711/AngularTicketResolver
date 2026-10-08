import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResult, TicketListItem, TicketListRequest } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  list(request: TicketListRequest): Observable<PagedResult<TicketListItem>> {
    return this.http.post<PagedResult<TicketListItem>>(`${this.base}/tickets/list`, request);
  }
}
