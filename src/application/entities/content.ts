export class Content {
  private readonly _content: string;

  get value(): string {
    return this._content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isValidContentLength = this.validateContentLength(content);
    if (!isValidContentLength) throw new Error('Content length invalid.');

    this._content = content;
  }
}
