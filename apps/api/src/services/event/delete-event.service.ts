import prisma from '@/prisma'; 

interface DeleteEventParams {
  eventId: number; 
  userId: number; 
}

export const deleteEventService = async ({ eventId, userId }: DeleteEventParams) => {
  try {
    
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    
    if (event.organizerId !== userId) {
      throw new Error('Unauthorized: You do not have permission to delete this event');
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    return { message: 'Event successfully deleted' };
  } catch (error) {
    throw error;
  }
};