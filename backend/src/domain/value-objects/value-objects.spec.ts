import { describe, expect, it } from "vitest";
import { OriginalUrl } from "./original-url.vo";
import { UrlCode } from "./url-code.vo";
import { ExpirationDate } from "./expiration-date.vo";

describe("Value Objects", () => {
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

  describe("UrlCode", () => {
    it("should create a valid UrlCode", () => {
      const vo = UrlCode.create("ABC123_");
      expect(vo.value).toBe("ABC123_");
    });

    it("should throw error if length is too short", () => {
      expect(() => UrlCode.create("ab")).toThrow(
        "Code length must be between 3 and 10 characters.",
      );
    });

    it("should throw error if length is too long", () => {
      expect(() => UrlCode.create("abcdefghijk")).toThrow(
        "Code length must be between 3 and 10 characters.",
      );
    });

    it("should throw error for special characters not allowed", () => {
      expect(() => UrlCode.create("abc$12")).toThrow(
        "Code must contain only alphanumeric characters, hyphens, or underscores.",
      );
    });
  });

  describe("ExpirationDate", () => {
    const mockNow = new Date("2026-06-05T12:00:00Z");

    it("should create null expiration if none provided", () => {
      const vo = ExpirationDate.create(null, mockNow);
      expect(vo.value).toBeNull();
    });

    it("should create a valid expiration date in the future", () => {
      const futureDate = "2026-06-05T13:00:00Z";
      const vo = ExpirationDate.create(futureDate, mockNow);
      expect(vo.value?.toISOString()).toBe(new Date(futureDate).toISOString());
    });

    it("should throw error if date is in the past", () => {
      const pastDate = "2026-06-05T11:00:00Z";
      expect(() => ExpirationDate.create(pastDate, mockNow)).toThrow(
        "Expiration date must be in the future.",
      );
    });

    it("should throw error for invalid date formats", () => {
      expect(() => ExpirationDate.create("not-a-date", mockNow)).toThrow(
        "Invalid expiration date format.",
      );
    });
  });
});
