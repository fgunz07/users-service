import { describe, expect, it } from "@jest/globals";

import { hashPassword, comparePassword } from "./bcrypt.util";

describe("bcrypt utils", () => {
  const plaintext = "test";
  it("should has plain text", (done) => {
    hashPassword(plaintext).then((result) => {
      expect(result).not.toBeNull();
      done();
    })
    .catch((error) => done(error));
  });

  it("should compare password", (done) => {
    hashPassword(plaintext)
      .then(async (result) => {
        const hashed = result as string;
        const toBeTruthy = await comparePassword(plaintext, hashed) as boolean;
        expect(toBeTruthy).toBeTruthy();
        done();
      })
      .catch((error) => done(error));
  });
});
