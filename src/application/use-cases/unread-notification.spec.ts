import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notificationts-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notificaiton', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = await makeNotification(
      undefined,
      undefined,
      undefined,
      new Date(),
    );
    await notificationsRepository.create(notification);

    await unreadNotification.execute(notification.id);

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a nonexistent notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(async () => {
      await unreadNotification.execute('fake-notification-id');
    }).rejects.toThrow('Notification not found.');
  });
});
