import prisma from '@/prisma';

interface CreateEvent {
  title: string;
  description: string;
  date: Date;
  location: string;
  organizerId: number; 
}

export const createEventService = async (body: CreateEvent) => {
  try {
    const { title, description, date, location, organizerId } = body;

    const user = await prisma.user.findUnique({
      where: { id: organizerId },
    });

    if (!user) throw new Error('User not found');
    if (user.role !== 'EVENT_ORGANIZER' && user.role !== 'SUPERADMIN') {
      throw new Error("User doesn't have the required role to create events");
    }

    const existingEvent = await prisma.event.findFirst({
      where: { title, date },
    });

    if (existingEvent) {
      throw new Error('An event with this title and date already exists');
    }

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date,
        location,
        organizerId,
      },
    });

    return { message: 'Event created successfully', data: newEvent };
  } catch (error) {
    throw error;
  }
};