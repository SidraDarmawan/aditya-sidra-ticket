import prisma from '@/prisma';
import { getReferralByCodeService, updateReferralPointsService } from '@/services/referral/referral.service';

interface CreateTicketBody {
  eventId: number;
  price: number;
  quantity: number;
  referralCode?: string;
}

export const createTicketService = async (body: CreateTicketBody) => {
  try {
    const { eventId, price, quantity, referralCode } = body;
    const existingTicket = await prisma.ticket.findFirst({
      where: { eventId, price },
    });

    if (existingTicket) {
      throw new Error('Ticket already exists for this event with the same price');
    }

   
    const createTicket = await prisma.ticket.create({
      data: {
        eventId,
        price,
        quantity,
      },
    });

    if (referralCode) {
      const referral = await getReferralByCodeService(referralCode);

      if (referral) {
        await updateReferralPointsService(referralCode, 10); 
      } else {
        throw new Error('Invalid referral code');
      }
    }

    return {
      message: 'Ticket has been created',
      data: createTicket,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create ticket: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the ticket.');
    }
  }
};

export const getTicketsByEventIdService = async (eventId: number) => {
  try {
    return await prisma.ticket.findMany({
      where: { eventId },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get tickets by event ID ${eventId}: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while retrieving tickets.');
    }
  }
};

export const updateTicketService = async (ticketId: number, updateData: any) => {
  try {
    return await prisma.ticket.update({
      where: { id: ticketId },
      data: updateData,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update ticket with ID ${ticketId}: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while updating the ticket.');
    }
  }
};

export const deleteTicketService = async (ticketId: number) => {
  try {
    return await prisma.ticket.delete({
      where: { id: ticketId },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete ticket with ID ${ticketId}: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while deleting the ticket.');
    }
  }
};