import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export class TicketController {
  constructor(private readonly ticketService = new TicketService()) {}

  public getTickets = async (req: Request, res: Response) => {
    res.json(this.ticketService.tickets);
  };

  public getLastTicket = async (req: Request, res: Response) => {
    res.json(this.ticketService.lastTicketNumber);
  };

  public getPendingTickets = async (req: Request, res: Response) => {
    res.json(this.ticketService.pendingTickets);
  };

  public createTicket = async (req: Request, res: Response) => {
    res.status(201).json(this.ticketService.createTicket());
  };

  public drawTicket = async (req: Request, res: Response) => {
    const { desk } = req.params;
    res.json(this.ticketService.drawTicket(desk));
  };

  public doneTicket = async (req: Request, res: Response) => {
    const { ticketId } = req.params;
    res.json(this.ticketService.doneTicket(ticketId));
  };

  public getWorkingOn = async (req: Request, res: Response) => {
    res.json(this.ticketService.workingOnTickets);
  };
}
