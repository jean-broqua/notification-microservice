import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notificationts-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get a notificaiton', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      await makeNotification(undefined, undefined, 'recipient-id'),
    );
    await notificationsRepository.create(
      await makeNotification(undefined, undefined, 'recipient-id'),
    );
    await notificationsRepository.create(await makeNotification());

    const notifications = await getRecipientNotifications.execute(
      'recipient-id',
    );

    expect(notifications).toHaveLength(2);
    expect(notifications[0].recipientId).toEqual('recipient-id');
    expect(notifications[1].recipientId).toEqual('recipient-id');
  });
});
