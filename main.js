const { crawlPage } = require("./crawler");
const { printReport } = require("./report");

const main = async () => {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many command line args");
    process.exit(1);
  }

  let baseURL = process.argv[2];
  try {
    new URL(baseURL);
  } catch (err) {
    console.log(`erro with provided website: ${err.message}`);
    process.exit(1);
  }

  console.log("starting crawl");
  const pages = await crawlPage(baseURL, baseURL, {});

  printReport(pages);
};

main();
