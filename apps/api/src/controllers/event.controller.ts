import { Request, Response, NextFunction } from 'express';
import { updateEventService } from '@/services/event/update-event.service';
import { UpdateEventDto } from '@/types/event.type';

export class EventController {

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = Number(req.params.id);
      const userId = Number(req.headers['user-id']);
      const userRole = String(req.headers['user-role']);
      const updateData: UpdateEventDto = req.body;

   
      if (isNaN(eventId) || isNaN(userId) || !userRole || !updateData) {
        return res.status(400).send({ message: 'Invalid input data' });
      }

      const result = await updateEventService({
        eventId,
        userId,
        userRole,
        updateData,
      });

      if (!result) {
        return res.status(400).send({ message: 'Event not found' });
      }
      return res.status(200).send(result);
    } catch (error) {
      console.error('Error updating event:', error);
      next(error);
    }
  }
}