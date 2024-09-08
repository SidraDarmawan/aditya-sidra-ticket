import prisma from '@/prisma'; 
import { EventQueryParams } from '@/types/event.type';

export const getEventsService = async (query: EventQueryParams) => {
  try {
    const { take, page, sortBy, sortOrder, search, userId } = query;

    if (!userId) throw new Error('userId is required');

    const events = await prisma.event.findMany({
      where: {
        AND: [
          {
            title: {
              contains: search,
            },
          },
          {
            organizerId: userId,
          },
        ],
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * take,
      take,
    });

    return events;
  } catch (error) {
    throw error;
  }
};