// This function listens for before navigate events and redirects the user to the archive.is version of the Bloomberg Opinion article.

chrome.webNavigation.onBeforeNavigate.addListener(
  function(details) {
    const bloombergOpinionPattern = /^https:\/\/www\.bloomberg\.com\/opinion\/articles\//;
    // A regular expression pattern to match Bloomberg Opinion articles.
    if (bloombergOpinionPattern.test(details.url)) {
      // If the URL matches the pattern:
      const redirectToArchiveIs = `https://archive.is/?run=1&url=${encodeURIComponent(details.url)}`;
      // The URL to redirect to, with the original URL encoded.
      chrome.tabs.update(details.tabId, { url: redirectToArchiveIs });
      // Update the tab's URL to the archive.is version.
    }
  },
  {
    url: [
      {
        schemes: ["https"],
        // Only match HTTPS URLs.
        hostEquals: "www.bloomberg.com",
        // Only match URLs from bloomberg.com.
        pathPrefix: "/opinion/articles/"
        // Only match URLs that start with "/opinion/articles/".
      }
    ]
  }
);
