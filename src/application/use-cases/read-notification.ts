import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

@Injectable()
export class ReadNotification {
  constructor(private _notificationsRepository: NotificationsRepository) {}

  async execute(notificationId: string): Promise<void> {
    const notification = await this._notificationsRepository.findById(
      notificationId,
    );

    if (!notification) throw new NotificationNotFound();

    notification.read();

    await this._notificationsRepository.save(notification);
  }
}
