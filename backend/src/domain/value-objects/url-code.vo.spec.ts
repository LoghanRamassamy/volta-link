import { describe, expect, it } from "vitest";
import { UrlCode } from "@/domain/value-objects/url-code.vo";

describe("UrlCode", () => {
  it("should create a valid UrlCode", () => {
    const vo = UrlCode.create("ABC123_");
    expect(vo.value).toBe("ABC123_");
  });

  it("should throw error if length is too short", () => {
    expect(() => UrlCode.create("ab")).toThrow("Code length must be between 3 and 10 characters.");
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
