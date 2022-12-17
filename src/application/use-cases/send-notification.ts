import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

@Injectable()
export class SendNotification {
  constructor(private _notificationsRepository: NotificationsRepository) {}

  async execute(
    recipientId: string,
    content: string,
    category: string,
  ): Promise<Notification> {
    const notification = new Notification(
      new Content(content),
      category,
      recipientId,
    );

    await this._notificationsRepository.create(notification);

    return notification;
  }
}
