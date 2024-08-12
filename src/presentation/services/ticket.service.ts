import { Ticket } from "../../domain/interfaces/tickets";
import { UuidAdapter } from "../../config/uui.adapter";
import { WssService } from "./wss.service";

export class TicketService {
  constructor(private readonly wssService = WssService.instance) {}

  public readonly tickets: Ticket[] = [
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

  private readonly workingOn: Ticket[] = [];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter((ticket) => !ticket.handledAtDesk);
  }

  public get workingOnTickets(): Ticket[] {
    return this.workingOn.slice(0, 4);
  }

  public get lastTicketNumber(): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.ticketNumber : 0;
  }

  public createTicket() {
    const ticketNumber = this.lastTicketNumber + 1;
    const ticket: Ticket = {
      id: UuidAdapter.generate(),
      ticketNumber,
      createdAt: new Date(),
      done: false,
    };
    this.tickets.push(ticket);
    this.onTicketNumberChange();
    return ticket;
  }

  public drawTicket(desk: string) {
    const ticket = this.tickets.find((ticket) => !ticket.handledAtDesk);
    if (!ticket) return { status: "error", message: "No tickets available" };
    ticket.handledAtDesk = desk;
    ticket.handleAt = new Date();
    this.workingOn.unshift({ ...ticket });
    this.onTicketNumberChange();
    return { status: "success", ticket };
  }

  public doneTicket(ticketId: string) {
    const ticket = this.tickets.find((ticket) => ticket.id === ticketId);
    if (!ticket) return { status: "error", message: "Ticket not found" };
    ticket.done = true;
    ticket.doneAt = new Date();
    return { status: "success", ticket };
  }

  private onTicketNumberChange() {
    this.wssService.sendMessage(
      "on-ticket-count-changed",
      this.pendingTickets.length
    );
  }
}
