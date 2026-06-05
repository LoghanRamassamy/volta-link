export class LinkNotFoundError extends Error {
  constructor(code: string) {
    super(`Short link with code '${code}' not found.`);
    this.name = 'LinkNotFoundError';
    Object.setPrototypeOf(this, LinkNotFoundError.prototype);
  }
}
