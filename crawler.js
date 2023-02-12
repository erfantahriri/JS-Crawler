const { JSDOM } = require("jsdom");

const crawlPage = async (baseURL, currentUrl, pages) => {
  const baseURLObj = new URL(baseURL);
  const currentUrlObj = new URL(currentUrl);

  if (baseURLObj.hostname != currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = linkNormalizer(currentUrl);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;
  console.log(`actively crawling: ${currentUrl}`);

  try {
    const resp = await fetch(currentUrl);
    if (resp.status > 399) {
      console.log(`error with status: ${resp.status} on page: ${currentUrl}`);
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType} on page ${currentUrl}`
      );
      return pages;
    }
    const htmlBody = await resp.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`error in fetch: ${err.message} on page ${currentUrl}`);
  }
  return pages;
};

const linkNormalizer = (url) => {
  const urlObj = new URL(url);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
};

const getURLsFromHTML = (htmlBody, baseURL) => {
  const dom = new JSDOM(htmlBody);
  const links = dom.window.document.querySelectorAll("a");
  const urls = [];
  for (const link of links) {
    if (link.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseURL}${link.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with relative url: ${err.message}`);
      }
    } else {
      try {
        const urlObj = new URL(link.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`);
      }
    }
  }
  return urls;
};

module.exports = {
  linkNormalizer,
  getURLsFromHTML,
  crawlPage,
};
