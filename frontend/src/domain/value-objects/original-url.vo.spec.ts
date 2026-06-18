import { describe, expect, it } from "vitest";
import { OriginalUrl } from "@/domain/value-objects/original-url.vo";

describe("OriginalUrl", () => {
  it("should create a valid URL object", () => {
    const vo = OriginalUrl.create("https://www.example.com");
    expect(vo.value).toBe("https://www.example.com");
  });

  it("should throw error for invalid url format", () => {
    expect(() => OriginalUrl.create("not-a-valid-url")).toThrow(/Invalid URL format/);
  });

  it("should throw error for non-http/https URL", () => {
    expect(() => OriginalUrl.create("ftp://example.com")).toThrow(
      "URL must use HTTP or HTTPS protocol.",
    );
  });
});
