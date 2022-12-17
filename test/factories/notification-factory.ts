import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { randomUUID } from 'crypto';

export async function makeNotification(
  content = 'Exemple Content',
  category = 'Exemple Category',
  recipientId = randomUUID(),
  readAt: Date | null | undefined = null,
) {
  return new Notification(new Content(content), category, recipientId, readAt);
}
