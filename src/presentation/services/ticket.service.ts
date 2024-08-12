import { Ticket } from "../../domain/interfaces/tickets";
import { UuidAdapter } from "../../config/uui.adapter";

export class TicketService {
  private readonly tickets: Ticket[] = [
    {
      id: UuidAdapter.generate(),
      ticketNumber: 1,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.generate(),
      ticketNumber: 2,
      createdAt: new Date(),
      done: false,
    },
    {
      id: UuidAdapter.generate(),
      ticketNumber: 3,
      createdAt: new Date(),
      done: false,
    },
  ];
}
