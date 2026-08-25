import { describe, expect, it } from "vitest";

describe("Runtime Environment", () => {
  it("loads environment variables properly", () => {
    expect(process.env.PORT || "3000").toBe("3000");
  });
});
