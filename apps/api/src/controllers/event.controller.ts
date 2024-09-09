import { Request, Response, NextFunction } from 'express';
import { updateEventService } from '@/services/event/update-event.service';
import { UpdateEventDto } from '@/types/event.type';


const validateUpdateData = (updateData: UpdateEventDto) => {
  if (!updateData.title || typeof updateData.title !== 'string') {
    return 'Invalid title in update data';
  }
  if (!updateData.description || typeof updateData.description !== 'string') {
    return 'Invalid description in update data';
  }
  return null;
};

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

     
      const validationError = validateUpdateData(updateData);
      if (validationError) {
        return res.status(400).send({ message: validationError });
      }

      if (userRole !== 'admin') { 
        return res.status(403).send({ message: 'Forbidden: Insufficient permissions' });
      }

      const result = await updateEventService({
        eventId,
        userId,
        userRole,
        updateData,
      });

      if (!result) {
        return res.status(404).send({ message: 'Event not found' });
      }

      return res.status(200).send(result);
    } catch (error) {
      console.error('Error updating event:', error);
      next(error);
    }
  }
}