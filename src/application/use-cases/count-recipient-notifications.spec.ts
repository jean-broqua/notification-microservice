import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notificationts-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications', () => {
  it('should be able to cancel a notificaiton', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      await makeNotification(undefined, undefined, 'recipient-id'),
    );
    await notificationsRepository.create(
      await makeNotification(undefined, undefined, 'recipient-id'),
    );
    await notificationsRepository.create(await makeNotification());

    const count = await countRecipientNotifications.execute('recipient-id');

    expect(count).toEqual(2);
  });
});
