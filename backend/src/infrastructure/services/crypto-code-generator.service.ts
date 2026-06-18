import type { CodeGenerator } from "@/application/interfaces/code-generator.interface";
import * as crypto from "crypto";

export class CryptoCodeGenerator implements CodeGenerator {
  public generate(length: number): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomBytes = crypto.randomBytes(length);

    return Array.from(randomBytes)
      .map((byte) => chars.charAt(byte % chars.length))
      .join("");
  }
}
