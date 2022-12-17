import { Notification as RawNotification } from '@prisma/client';

import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createDate,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      new Content(raw.content),
      raw.category,
      raw.recipientId,
      raw.readAt,
      raw.canceledAt,
      raw.createdAt,
      raw.id,
    );
  }
}
