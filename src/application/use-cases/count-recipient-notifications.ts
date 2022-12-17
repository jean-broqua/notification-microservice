import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

@Injectable()
export class CountRecipientNotifications {
  constructor(private _notificationsRepository: NotificationsRepository) {}

  async execute(recipientId: string): Promise<number> {
    const count = await this._notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return count;
  }
}
