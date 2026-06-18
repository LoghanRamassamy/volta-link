export class UrlCode {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(value: string): UrlCode {
    if (!value || "string" !== typeof value) {
      throw new Error("Code must be a non-empty string.");
    }
    const trimmed = value.trim();
    const codeRegex = /^[a-zA-Z0-9_-]+$/;
    if (3 > trimmed.length || 10 < trimmed.length) {
      throw new Error("Code length must be between 3 and 10 characters.");
    }
    if (!codeRegex.test(trimmed)) {
      throw new Error("Code must contain only alphanumeric characters, hyphens, or underscores.");
    }
    return new UrlCode(trimmed);
  }
}
