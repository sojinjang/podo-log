import { jest } from "@jest/globals";

declare global {
  const jest: typeof jest;
  const expect: (typeof jest)["expect"];
  const describe: (typeof jest)["describe"];
  const beforeEach: (typeof jest)["beforeEach"];
  const afterEach: (typeof jest)["afterEach"];
  const test: (typeof jest)["test"];
}
