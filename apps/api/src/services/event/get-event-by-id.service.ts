import prisma from '@/prisma'; 

interface GetEventByIdParams {
  eventId: number; 
  userId: number; 
}

export const getEventByIdService = async ({ eventId, userId }: GetEventByIdParams) => {
  try {
    
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { 
        organizer: true, 
        tickets: true, 
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    if (event.organizerId !== userId) {
      throw new Error('Unauthorized: You do not have permission to view this event');
    }

    return { message: 'Event details fetched successfully', data: event };
  } catch (error) {
    throw error;
  }
};