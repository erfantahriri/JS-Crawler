const { sortPages } = require("./report");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
  const input = {
    "https://mehdy.me": 3,
    "https://mehdy.me/path1/": 5,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://mehdy.me/path1/", 5],
    ["https://mehdy.me", 3],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages multi", () => {
  const input = {
    "https://mehdy.me": 8,
    "https://mehdy.me/path1/": 5,
    "https://mehdy.me/path2/": 34,
    "https://mehdy.me/path3/": 2,
    "https://mehdy.me/path4/": 15,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://mehdy.me/path2/", 34],
    ["https://mehdy.me/path4/", 15],
    ["https://mehdy.me", 8],
    ["https://mehdy.me/path1/", 5],
    ["https://mehdy.me/path3/", 2],
  ];
  expect(actual).toEqual(expected);
});
