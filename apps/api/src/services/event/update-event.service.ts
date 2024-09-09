import prisma from '@/prisma'; 

interface UpdateEventParams {
  eventId: number; 
  userId: number; 
  userRole: string; 
  updateData: {
    title?: string;
    description?: string;
    date?: Date;
  };
}

export const updateEventService = async ({ eventId, userId, userRole, updateData }: UpdateEventParams) => {
  try {
   
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    if (event.organizerId !== userId && userRole !== 'SUPERADMIN') {
      throw new Error('Unauthorized: You do not have permission to update this event');
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: updateData,
    });

    return { message: 'Event updated successfully', data: updatedEvent };
  } catch (error) {
    throw error;
  }
};