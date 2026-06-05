export class LinkExpiredError extends Error {
  constructor(code: string, expiredAt: Date) {
    super(`Short link with code '${code}' expired at ${expiredAt.toISOString()}.`);
    this.name = "LinkExpiredError";
    Object.setPrototypeOf(this, LinkExpiredError.prototype);
  }
}
