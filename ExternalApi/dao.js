import "dotenv/config";

export const getWordleByDay = async (day) => {
  const response = await fetch(`https://www.nytimes.com/svc/wordle/v2/${day}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch wordle data");
  }
  const wordleData = await response.json();
  return wordleData;
};

export const getWordInfo = async (word) => {
  try {
    // First, get the main information about the word
    const infoUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${encodeURIComponent(word)}&exintro=1&explaintext=1&redirects=1&origin=*`
    const infoResponse = await fetch(infoUrl)
    const infoData  = await infoResponse.json()

    if (!infoData.query?.pages) {
      return {
        title: word,
        extract: "No information found.",
        related: [],
        error: "No information found",
      }
    }

    const pageId = Object.keys(infoData.query.pages)[0]

    // If page ID is -1, it means the page doesn't exist
    if (pageId === "-1") {
      return {
        title: word,
        extract: "No information found.",
        related: [],
        error: "Page not found",
      }
    }

    const page = infoData.query.pages[pageId]
    const extract = page.extract || "No extract available."

    // Now get related links
    const linksUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=${encodeURIComponent(word)}&pllimit=10&origin=*`
    const linksResponse = await fetch(linksUrl)
    const linksData = await linksResponse.json()

    let related = []

    if (linksData.query?.pages && linksData.query.pages[pageId]?.links) {
      related = linksData.query.pages[pageId].links
        .map((link) => link.title)
        .filter(
          (title) =>
            // Filter out meta pages, categories, etc.
            !title.startsWith("Wikipedia:") &&
            !title.startsWith("Template:") &&
            !title.startsWith("Help:") &&
            !title.startsWith("Category:") &&
            !title.startsWith("Portal:") &&
            !title.includes("disambiguation"),
        )
        .slice(0, 15) // Limit to 15 related terms
    }

    return {
      title: word,
      extract,
      related,
    }
  } catch (error) {
    return {
      title: word,
      extract: "An error occurred while fetching information.",
      related: [],
      error: "API error",
    }
  }
}
