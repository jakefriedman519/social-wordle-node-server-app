import "dotenv/config";

export const getWordleByDay = async (day) => {
  const response = await fetch(`https://www.nytimes.com/svc/wordle/v2/${day}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch wordle data");
  }
  const wordleData = await response.json();
  return wordleData;
};
