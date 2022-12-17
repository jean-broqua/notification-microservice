import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notificationts-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notificaiton', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = await makeNotification();
    await notificationsRepository.create(notification);

    await readNotification.execute(notification.id);

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a nonexistent notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(async () => {
      await readNotification.execute('fake-notification-id');
    }).rejects.toThrow('Notification not found.');
  });
});
