import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificaitonBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotifiations: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute(id);
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const count = await this.countRecipientNotifications.execute(recipientId);

    return { count };
  }

  @Get('/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const notifications = await this.getRecipientNotifiations.execute(
      recipientId,
    );

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute(id);
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute(id);
  }

  @Post()
  async create(@Body() body: CreateNotificaitonBody) {
    const { recipiantId, content, category } = body;
    const notification = await this.sendNotification.execute(
      recipiantId,
      content,
      category,
    );

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
