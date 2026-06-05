import { describe, expect, it } from "vitest";
import { OriginalUrl } from "@/domain/value-objects/original-url.vo";
import { ExpirationDate } from "@/domain/value-objects/expiration-date.vo";

describe("Frontend Value Objects", () => {
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
  });
});
