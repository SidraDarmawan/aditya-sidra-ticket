import prisma from '@/prisma';

export const deleteTicketService = async (ticketId: number) => {
  try {
  
    await prisma.ticket.delete({
      where: { id: ticketId },
    });

    return {
      message: 'Ticket has been deleted',
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete ticket: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while deleting the ticket.');
    }
  }
};