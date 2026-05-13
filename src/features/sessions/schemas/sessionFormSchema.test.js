import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { sessionFormSchema } from "./sessionFormSchema.js";

/**
 * Property 1: Zod schema field-level validation
 *
 * For any input object, the session form Zod schema SHALL reject the input when
 * `date` is an empty string, when `time` does not match the HH:mm pattern, or
 * when `duration` is not an integer in the range [15, 480] divisible by 15 —
 * and SHALL accept the input when all three fields satisfy their respective
 * constraints (assuming the cross-field refinement also passes).
 *
 * Validates: Requirements 15.1
 */
describe("Feature: session-frontend-integration, Property 1: Zod schema field-level validation", () => {
  // Helper: generate a future date string (YYYY-MM-DD) at least 2 days from now
  // to avoid timezone edge cases where the date+time could end up in the past
  const futureDateArb = fc
    .integer({ min: 2, max: 365 })
    .map((daysAhead) => {
      const d = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    });

  // Helper: generate a valid HH:mm time string
  const validTimeArb = fc
    .tuple(fc.integer({ min: 0, max: 23 }), fc.integer({ min: 0, max: 59 }))
    .map(([h, m]) => `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);

  // Helper: generate a valid duration (15-480, divisible by 15)
  const validDurationArb = fc
    .integer({ min: 1, max: 32 })
    .map((n) => n * 15);

  it("rejects when date is an empty string", () => {
    fc.assert(
      fc.property(validTimeArb, validDurationArb, (time, duration) => {
        const result = sessionFormSchema.safeParse({ date: "", time, duration });
        expect(result.success).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it("rejects when time does not match HH:mm pattern", () => {
    // Generate strings that do NOT match /^\d{2}:\d{2}$/
    const invalidTimeArb = fc.oneof(
      fc.constant(""),                          // empty
      fc.constant("9:30"),                      // single digit hour
      fc.constant("12:5"),                      // single digit minute
      fc.constant("123:45"),                    // three digit hour
      fc.constant("12:345"),                    // three digit minute
      fc.constant("ab:cd"),                     // letters
      fc.constant("12-30"),                     // wrong separator
      fc.constant("1230"),                      // no separator
      fc.string({ minLength: 0, maxLength: 10 })
        .filter((s) => !/^\d{2}:\d{2}$/.test(s)), // random non-matching strings
    );

    fc.assert(
      fc.property(futureDateArb, invalidTimeArb, validDurationArb, (date, time, duration) => {
        const result = sessionFormSchema.safeParse({ date, time, duration });
        expect(result.success).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it("rejects when duration is outside [15, 480]", () => {
    const invalidDurationArb = fc.oneof(
      fc.integer({ min: -1000, max: 14 }),      // below minimum
      fc.integer({ min: 481, max: 10000 }),     // above maximum
    );

    fc.assert(
      fc.property(futureDateArb, validTimeArb, invalidDurationArb, (date, time, duration) => {
        const result = sessionFormSchema.safeParse({ date, time, duration });
        expect(result.success).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it("rejects when duration is not divisible by 15", () => {
    // Generate integers in [15, 480] that are NOT divisible by 15
    const nonDivisibleArb = fc
      .integer({ min: 15, max: 480 })
      .filter((n) => n % 15 !== 0);

    fc.assert(
      fc.property(futureDateArb, validTimeArb, nonDivisibleArb, (date, time, duration) => {
        const result = sessionFormSchema.safeParse({ date, time, duration });
        expect(result.success).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it("rejects when duration is not an integer", () => {
    // Generate non-integer numbers in the valid range
    const nonIntegerDurationArb = fc
      .tuple(fc.integer({ min: 1, max: 31 }), fc.integer({ min: 1, max: 99 }))
      .map(([whole, frac]) => whole * 15 + frac / 100)
      .filter((n) => !Number.isInteger(n));

    fc.assert(
      fc.property(futureDateArb, validTimeArb, nonIntegerDurationArb, (date, time, duration) => {
        const result = sessionFormSchema.safeParse({ date, time, duration });
        expect(result.success).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it("accepts valid combinations (valid date, valid HH:mm time, valid duration, future timestamp)", () => {
    fc.assert(
      fc.property(futureDateArb, validTimeArb, validDurationArb, (date, time, duration) => {
        const result = sessionFormSchema.safeParse({ date, time, duration });
        // The schema should accept when all field-level constraints pass
        // AND the cross-field refinement passes (future date ensures this)
        expect(result.success).toBe(true);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 2: Zod schema rejects past start times
 *
 * For any date and time combination that produces a timestamp in the past
 * relative to the moment of validation, the session form Zod schema SHALL
 * reject the input regardless of the duration value. Conversely, for any
 * date and time combination that produces a timestamp in the future with a
 * valid duration, the schema SHALL accept the input.
 *
 * Validates: Requirements 8.3, 15.2
 */
describe("Feature: session-frontend-integration, Property 2: Zod schema rejects past start times", () => {
  // Helper: generate a valid duration (15-480, divisible by 15)
  const validDurationArb = fc
    .integer({ min: 1, max: 32 })
    .map((n) => n * 15);

  // Helper: generate a past date/time combination (at least 2 minutes in the past)
  const pastDateTimeArb = fc
    .integer({ min: 2, max: 525600 }) // 2 minutes to ~1 year in the past
    .map((minutesAgo) => {
      const pastDate = new Date(Date.now() - minutesAgo * 60 * 1000);
      const year = pastDate.getFullYear();
      const month = String(pastDate.getMonth() + 1).padStart(2, "0");
      const day = String(pastDate.getDate()).padStart(2, "0");
      const hours = String(pastDate.getHours()).padStart(2, "0");
      const minutes = String(pastDate.getMinutes()).padStart(2, "0");
      return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}`,
      };
    });

  // Helper: generate a future date/time combination (at least 5 minutes in the future)
  const futureDateTimeArb = fc
    .integer({ min: 5, max: 525600 }) // 5 minutes to ~1 year in the future
    .map((minutesAhead) => {
      const futureDate = new Date(Date.now() + minutesAhead * 60 * 1000);
      const year = futureDate.getFullYear();
      const month = String(futureDate.getMonth() + 1).padStart(2, "0");
      const day = String(futureDate.getDate()).padStart(2, "0");
      const hours = String(futureDate.getHours()).padStart(2, "0");
      const minutes = String(futureDate.getMinutes()).padStart(2, "0");
      return {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}`,
      };
    });

  it("rejects any date/time combination in the past regardless of duration", () => {
    fc.assert(
      fc.property(pastDateTimeArb, validDurationArb, ({ date, time }, duration) => {
        const result = sessionFormSchema.safeParse({ date, time, duration });
        expect(result.success).toBe(false);
        // Verify the error is specifically about the past time refinement
        if (!result.success) {
          const messages = result.error.issues.map((i) => i.message);
          expect(messages).toContain("Session must be scheduled in the future");
        }
      }),
      { numRuns: 100 }
    );
  });

  it("accepts any date/time combination in the future with valid duration", () => {
    fc.assert(
      fc.property(futureDateTimeArb, validDurationArb, ({ date, time }, duration) => {
        const result = sessionFormSchema.safeParse({ date, time, duration });
        expect(result.success).toBe(true);
      }),
      { numRuns: 100 }
    );
  });
});
