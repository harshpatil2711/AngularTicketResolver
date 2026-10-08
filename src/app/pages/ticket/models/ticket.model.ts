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

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface TicketListRequest {
  searchTerm?: string | null;
  categoryId?: number | null;
  priorityId?: number | null;
  statusId?: number | null;
  page: number;
  size: number;
  isUnassigned?: boolean | null;
}
