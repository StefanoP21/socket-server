export interface Ticket {
  id: string;
  ticketNumber: number;
  createdAt: Date;
  handledAtDesk?: string;
  handleAt?: Date;
  done: boolean;
  doneAt?: Date;
}
