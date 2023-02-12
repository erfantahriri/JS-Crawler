const { linkNormalizer, getURLsFromHTML } = require("./crawler");
const { test, expect } = require("@jest/globals");

test("linkNormalize", () => {
  const actual = linkNormalizer("https://mehdy.me");
  const expected = "mehdy.me";
  expect(actual).toEqual(expected);
});

test("linkNormalize path", () => {
  const actual = linkNormalizer("https://mehdy.me/en");
  const expected = "mehdy.me/en";
  expect(actual).toEqual(expected);
});

test("linkNormalize slash", () => {
  const actual = linkNormalizer("https://mehdy.me/");
  const expected = "mehdy.me";
  expect(actual).toEqual(expected);
});

test("linkNormalize uppercase", () => {
  const actual = linkNormalizer("https://MEHDY.me");
  const expected = "mehdy.me";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML", () => {
  const actual = getURLsFromHTML(`
    <html>
        <body>
            <a href="https://mehdy.me/path1">
                Path1
            </a>
        </body>
    </html>
    `);
  const expected = ["https://mehdy.me/path1"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const baseURL = "https://mehdy.me";
  const actual = getURLsFromHTML(
    `
      <html>
          <body>
              <a href="/path1">
                  Path1
              </a>
          </body>
      </html>
      `,
    baseURL
  );
  const expected = ["https://mehdy.me/path1"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const baseURL = "https://mehdy.me";
  const actual = getURLsFromHTML(
    `
        <html>
            <body>
                <a href="/path1/">
                    Path1
                </a>
                <a href="https://mehdy.me/path2/">
                    Path2
                </a>
            </body>
        </html>
        `,
    baseURL
  );
  const expected = ["https://mehdy.me/path1/", "https://mehdy.me/path2/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const baseURL = "https://mehdy.me";
  const actual = getURLsFromHTML(
    `
          <html>
              <body>
                  <a href="invalid">
                      Path1
                  </a>
              </body>
          </html>
          `,
    baseURL
  );
  const expected = [];
  expect(actual).toEqual(expected);
});
