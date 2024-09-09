import prisma from '@/prisma';

export const getTicketsByEventIdService = async (eventId: number) => {
  try {
    
    const tickets = await prisma.ticket.findMany({
      where: { eventId },
    });

    return {
      message: 'Tickets fetched successfully',
      data: tickets,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get tickets for event ID ${eventId}: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while retrieving tickets.');
    }
  }
};