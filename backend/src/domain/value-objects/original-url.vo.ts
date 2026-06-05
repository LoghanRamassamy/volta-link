export class OriginalUrl {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(value: string): OriginalUrl {
    if (!value || typeof value !== "string") {
      throw new Error("URL must be a non-empty string.");
    }
    const trimmed = value.trim();
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      throw new Error("Invalid URL format.");
    }
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("URL must use HTTP or HTTPS protocol.");
    }
    return new OriginalUrl(trimmed);
  }
}
