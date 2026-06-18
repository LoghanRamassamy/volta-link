export class ExpirationDate {
  public readonly value: Date | null;

  private constructor(value: Date | null) {
    this.value = value;
    Object.freeze(this);
  }

  public static create(
    value: Date | string | null | undefined,
    referenceDate: Date = new Date(),
  ): ExpirationDate {
    if (null === value || value === undefined || "" === value) {
      return new ExpirationDate(null);
    }

    const date = "string" === typeof value ? new Date(value) : value;

    if (isNaN(date.getTime())) {
      throw new TypeError("Invalid expiration date format.");
    }

    if (date.getTime() <= referenceDate.getTime()) {
      throw new Error("Expiration date must be in the future.");
    }

    return new ExpirationDate(date);
  }
}
