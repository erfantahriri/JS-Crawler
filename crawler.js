const linkNormalizer = (url) => {
  const urlObj = new URL(url);
  return `${urlObj.hostname}${urlObj.pathname}`;
};

module.exports = {
  linkNormalizer,
};
