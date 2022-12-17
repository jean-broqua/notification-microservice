import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create to create a notification', () => {
    const notification = new Notification(
      new Content('Exemple notification content'),
      'Category',
      'exemple-recipient-id',
    );

    expect(notification).toBeTruthy();
  });
});
