import prisma from '@/prisma';

interface UpdateTicketData {
  price?: number;
  quantity?: number;
  sold?: number;
}

export const updateTicketService = async (ticketId: number, updateData: UpdateTicketData) => {
  try {
    
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: updateData,
    });

    return {
      message: 'Ticket has been updated',
      data: updatedTicket,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update ticket: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while updating the ticket.');
    }
  }
};