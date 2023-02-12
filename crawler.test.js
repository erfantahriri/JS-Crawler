const { linkNormalizer } = require("./crawler");
const { test, expect } = require("@jest/globals");

test("linkNormalize", () => {
  const actual = linkNormalizer("https://mehdy.me/en/");
  const expected = "mehdy.me/en/";
  expect(actual).toEqual(expected);
});
