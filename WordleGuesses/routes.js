import * as dao from "./dao.js";

export default function WordleGuessesRoutes(app) {
  // TODO these are basic routes, we should add more functionality to the routes / change as needed
  const getWordleGuessById = async (req, res) => {
    const wordleGuess = await dao.findWordleGuesses({ _id: req.params.wordleId });
    res.json(wordleGuess);
  };
  const getWordleGuessesByUserId = async (req, res) => {
    const wordleGuesses = await dao.findWordleGuesses({ user: req.params.userId });
    res.json(wordleGuesses);
  };
  const getWordleGuessesByDate = async (req, res) => {
    const wordleGuesses = await dao.findWordleGuesses({ createdDate: req.params.date });
    res.json(wordleGuesses.sort((a, b) => {
      if (a.score === -1) return 1;
      if (b.score === -1) return -1;
      return a.score - b.score;
    }));
  };
  const getUserWordleGuessesByDate = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.json([]);
    }
    const wordleGuess = await dao.findWordleGuesses({
      userId: currentUser._id,
      createdDate: new Date(req.params.date),
    });
    res.json(wordleGuess[0]);
  };
  const getUserWordleGuessesByWordleId = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const wordleGuess = await dao.findWordleGuesses({
      userId: currentUser._id,
      wordleId: req.params.wordleId,
    });
    res.json(wordleGuess[0]);
  }
  const createOrUpdateDailyWordleGuess = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.json({});
    }
    const wordleGuess = await dao.createOrUpdateWordleGuess(req.body, currentUser._id);
    res.json(wordleGuess);
  };
  const createOrUpdateCustomWordleGuess = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const wordle = await dao.createOrUpdateCustomWordleGuess(req.body, currentUser._id);
    res.json(wordle);
  }
  const deleteWordleGuess = async (req, res) => {
    const status = await dao.deleteWordle(req.params.wordleId);
    res.json(status);
  };

  app.get("/api/wordle-guesses/:wordleId", getWordleGuessById);
  app.get("/api/wordle-guesses/user/:userId", getWordleGuessesByUserId);
  app.get("/api/wordle-guesses/date/:date", getWordleGuessesByDate);
  app.get("/api/wordle-guesses/user/date/:date", getUserWordleGuessesByDate);
  app.get("/api/wordle-guesses/user/wordleId/:wordleId", getUserWordleGuessesByWordleId);
  app.patch("/api/wordle-guesses", createOrUpdateDailyWordleGuess);
  app.patch("/api/wordle-guesses/custom", createOrUpdateCustomWordleGuess);
  app.delete("/api/wordle-guesses/:wordleId", deleteWordleGuess);
}
