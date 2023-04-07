// This function listens for before navigate events and redirects the user to the archive.is version of target articles.

chrome.webNavigation.onBeforeNavigate.addListener(
  function(details) {
    const patterns = [
      /^https:\/\/www\.bloomberg\.com\/opinion\/articles\//, 
      /^https:\/\/www\.nytimes\.com\/wirecutter\/reviews\//
    ];

    const urlMatchesPattern = patterns.some(pattern => pattern.test(details.url));

    if (urlMatchesPattern) {
      // If the URL matches any of the patterns:
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
      },
      {
        schemes: ["https"],
        // Only match HTTPS URLs.
        hostEquals: "www.nytimes.com",
        // Only match URLs from nytimes.com.
        pathPrefix: "/wirecutter/reviews/"
        // Only match URLs that start with "/wirecutter/reviews/".
      }
    ]
  }
);
