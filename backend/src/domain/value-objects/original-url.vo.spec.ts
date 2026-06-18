import { describe, expect, it } from "vitest";
import { OriginalUrl } from "@/domain/value-objects/original-url.vo";

describe("OriginalUrl", () => {
  it("should create a valid URL object", () => {
    const vo = OriginalUrl.create("https://www.google.com");
    expect(vo.value).toBe("https://www.google.com");
  });

  it("should throw error for invalid url format", () => {
    expect(() => OriginalUrl.create("invalid-url")).toThrow("Invalid URL format.");
  });

  it("should throw error for non-http/https URL", () => {
    expect(() => OriginalUrl.create("ftp://google.com")).toThrow(
      "URL must use HTTP or HTTPS protocol.",
    );
  });
});
