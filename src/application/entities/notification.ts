import { Content } from './content';
import { randomUUID } from 'node:crypto';

export class Notification {
  private _id: string;
  private _recipientId: string;
  private _content: Content;
  private _category: string;
  private _readAt: Date | null | undefined;
  private _canceledAt: Date | null | undefined;
  private _createDate: Date;

  constructor(
    content: Content,
    category: string,
    recipientId: string,
    readAt: Date | null | undefined = undefined,
    canceledAt: Date | null | undefined = undefined,
    createDate = new Date(),
    id = randomUUID(),
  ) {
    this._recipientId = recipientId;
    this._content = content;
    this._category = category;
    this._readAt = readAt;
    this._canceledAt = canceledAt;
    this._createDate = createDate;
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  public get recipientId(): string {
    return this._recipientId;
  }

  public set recipientId(value: string) {
    this._recipientId = value;
  }

  public get content(): Content {
    return this._content;
  }

  public set content(value: Content) {
    this._content = value;
  }

  public get category(): string {
    return this._category;
  }

  public set category(value: string) {
    this._category = value;
  }

  public get readAt(): Date | null | undefined {
    return this._readAt;
  }

  public read() {
    this._readAt = new Date();
  }

  public unread() {
    this._readAt = null;
  }

  public get canceledAt(): Date | null | undefined {
    return this._canceledAt;
  }

  public get createDate(): Date {
    return this._createDate;
  }

  public cancel() {
    this._canceledAt = new Date();
  }
}
