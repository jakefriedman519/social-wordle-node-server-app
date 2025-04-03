import * as dao from "./dao.js";

export default function WordleGuessesRoutes(app) {
  // TODO these are basic routes, we should add more functionality to the routes / change as needed
  const getWordleGuessById = async (req, res) => {
    const wordle = await dao.findWordleById(req.params.wordleId);
    res.json(wordle);
  };
  const getWordleGuessesByUserId = async (req, res) => {
    const wordles = await dao.findWordlesByUserId(req.params.userId);
    res.json(wordles);
  };
  const getWordleGuessesByDate = async (req, res) => {
    const wordle = await dao.findWordleByDate(req.params.date);
    res.json(wordle);
  };
  const getWordleGuessesByTournamentId = async (req, res) => {
    const wordles = await dao.findWordlesByTournamentId(req.params.tournamentId);
    res.json(wordles);
  };
  const createWordleGuess = async (req, res) => {
    const wordle = await dao.createWordle(req.body);
    res.json(wordle);
  };
  const deleteWordleGuess = async (req, res) => {
    const status = await dao.deleteWordle(req.params.wordleId);
    res.json(status);
  };

  app.get("/api/wordle/:wordleId", getWordleGuessById);
  app.get("/api/wordle/user/:userId", getWordleGuessesByUserId);
  app.get("/api/wordle/date/:date", getWordleGuessesByDate);
  app.get("/api/wordle/tournament/:tournamentId", getWordleGuessesByTournamentId);
  app.post("/api/wordle", createWordleGuess);
  app.delete("/api/wordle/:wordleId", deleteWordleGuess);
}