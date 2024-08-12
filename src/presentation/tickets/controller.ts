import { Request, Response } from "express";

export class TicketController {
  constructor() {}

  public getTickets = async (req: Request, res: Response) => {
    res.json("getTickets");
  };

  public getLastTicket = async (req: Request, res: Response) => {
    res.json("getLastTicket");
  };

  public getPendingTickets = async (req: Request, res: Response) => {
    res.json("getPendingTickets");
  };

  public createTicket = async (req: Request, res: Response) => {
    res.json("createTicket");
  };

  public drawTicket = async (req: Request, res: Response) => {
    res.json("drawTicket");
  };

  public doneTicket = async (req: Request, res: Response) => {
    res.json("doneTicket");
  };

  public getWorkingOn = async (req: Request, res: Response) => {
    res.json("getWorkingOn");
  };
}
