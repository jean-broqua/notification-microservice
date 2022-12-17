import { SendNotification } from './send-notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notificationts-repository';

describe('Send notification', () => {
  it('should be able to send a notificaiton', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const newNotification = await sendNotification.execute(
      'recipient-id',
      'exemple content',
      'category',
    );

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(newNotification);
  });
});
