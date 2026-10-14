export interface TicketListItem {
  ticketId: number;
  ticketNumber: string;
  subject: string;
  categoryName: string;
  priorityName: string;
  statusName: string;
  createdByName: string;
  assignedToName: string | null;
  createdDate: string;
}

export interface TicketCategory {
  categoryId: number;
  categoryName: string;
}

export interface TicketPriority {
  priorityId: number;
  priorityName: string;
  sequence: number;
}

export interface TicketStatus {
  statusId: number;
  statusName: string;
  isTerminalState: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface TicketSearchResult<T> extends PagedResult<T> {
  categories: TicketCategory[];
  priorities: TicketPriority[];
  statuses: TicketStatus[];
}

export interface TicketFilterCriteria {
  searchTerm?: string | null;
  categoryId?: number | null;
  priorityId?: number | null;
  statusId?: number | null;
  isUnassigned?: boolean | null;
}

export interface TicketListRequest extends TicketFilterCriteria {
  page: number;
  size: number;
}
