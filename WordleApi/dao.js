import "dotenv/config";
// TODO use env config for credentials/route of the exrernal api

export const getWordleByDay = async (day) => {
  const response = await fetch(`https://api.wordleapi.dev/api/v1/word/${day}`);
  if (!response.ok) {
    throw new Error("Failed to fetch wordle data");
  }
  const wordleData = await response.json();
  return wordleData;
};
