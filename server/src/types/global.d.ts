import { jest } from "@jest/globals";

declare global {
  const jest: typeof jest;
  const expect: (typeof jest)["expect"];
  const describe: (typeof jest)["describe"];
  const beforeEach: (typeof jest)["beforeEach"];
  const beforeAll: (typeof jest)["beforeAll"];
  const afterEach: (typeof jest)["afterEach"];
  const afterAll: (typeof jest)["afterAll"];
  const test: (typeof jest)["test"];
  const it: (typeof jest)["it"];
}
