import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private _prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notificaiton = await this._prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notificaiton) return null;

    return PrismaNotificationMapper.toDomain(notificaiton);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this._prisma.notification.findMany({
      where: { recipientId },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);

    // return notifications.map((notification) => {
    //   return PrismaNotificationMapper.toDomain(notification);
    // });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this._prisma.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async save(notificaiton: Notification): Promise<void> {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notificaiton);

    await this._prisma.notification.update({
      where: { id: prismaNotification.id },
      data: prismaNotification,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this._prisma.notification.create({
      data: raw,
    });
  }
}
