import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notificationts-repository';
import { CancelNotification } from './cancel-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification', () => {
  it('should be able to cancel a notificaiton', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = await makeNotification();

    await notificationsRepository.create(notification);
    await cancelNotification.execute(notification.id);

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a nonexistent notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(async () => {
      await cancelNotification.execute('fake-notification-id');
    }).rejects.toThrow('Notification not found.');
  });
});
