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

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter((ticket) => !ticket.handledAtDesk);
  }

  public lastTicketNumber(): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.ticketNumber : 0;
  }

  public createTicket() {
    const ticketNumber = this.lastTicketNumber() + 1;
    const ticket: Ticket = {
      id: UuidAdapter.generate(),
      ticketNumber,
      createdAt: new Date(),
      done: false,
    };
    this.tickets.push(ticket);
    return ticket;
  }

  public drawTicket(desk: string) {
    const ticket = this.tickets.find((ticket) => !ticket.handledAtDesk);
    if (!ticket) return { status: "error", message: "No tickets available" };
    ticket.handledAtDesk = desk;
    ticket.handleAt = new Date();
    return { status: "success", ticket };
  }

  public doneTicket(ticketId: string) {
    const ticket = this.tickets.find((ticket) => ticket.id === ticketId);
    if (!ticket) return { status: "error", message: "Ticket not found" };
    ticket.done = true;
    ticket.doneAt = new Date();
    return { status: "success", ticket };
  }
}
