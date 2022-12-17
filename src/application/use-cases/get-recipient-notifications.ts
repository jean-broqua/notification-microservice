import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

@Injectable()
export class GetRecipientNotifications {
  constructor(private _notificationsRepository: NotificationsRepository) {}

  async execute(recipientId: string): Promise<Notification[]> {
    const notifications: Notification[] =
      await this._notificationsRepository.findManyByRecipientId(recipientId);
    return notifications;
  }
}
