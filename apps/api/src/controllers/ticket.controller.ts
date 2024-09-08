import { Request, Response } from 'express';
import {
  createTicketService,
  getTicketsByEventIdService,
  updateTicketService,
  deleteTicketService,
} from '@/services/ticket/create-ticket.service'; 

export const createTicketController = async (req: Request, res: Response) => {
  try {
    const ticketData = req.body;
    const result = await createTicketService(ticketData);
    res.status(200).send(result); 
  } catch (error) {
    res.status(400).send({ message: (error as Error).message }); 
  }
};


export const getTicketsByEventIdController = async (req: Request, res: Response) => {
  try {
    const eventId = parseInt(req.params.eventId, 10);
    const result = await getTicketsByEventIdService(eventId);
    res.status(200).send(result); 
  } catch (error) {
    res.status(400).send({ message: (error as Error).message });
  }
};


export const updateTicketController = async (req: Request, res: Response) => {
  try {
    const ticketId = parseInt(req.params.ticketId, 10);
    const updateData = req.body;
    const result = await updateTicketService(ticketId, updateData);
    res.status(200).send(result); 
  } catch (error) {
    res.status(400).send({ message: (error as Error).message });
  }
};


export const deleteTicketController = async (req: Request, res: Response) => {
  try {
    const ticketId = parseInt(req.params.ticketId, 10);
    const result = await deleteTicketService(ticketId);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: (error as Error).message }); 
  }
};