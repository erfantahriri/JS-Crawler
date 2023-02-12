const printReport = (pages) => {
  console.log("============");
  console.log("REPORT");
  console.log("============");
  const sortedPages = sortPages(pages);
  for (const page of sortedPages) {
    const url = page[0];
    const hits = page[1];
    console.log(`Found ${hits} links to page: ${url}`);
  }
  console.log("============");
  console.log("END REPORT");
  console.log("============");
};

const sortPages = (pages) => {
  pagesArr = Object.entries(pages);
  return pagesArr.sort((a, b) => {
    return b[1] - a[1];
  });
};

module.exports = {
  sortPages,
  printReport,
};
