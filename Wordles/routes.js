import * as dao from "./dao.js";

export default function WordleRoutes(app) {
  // TODO these are basic routes, we should add more functionality to the routes / change as needed
  const getWordleById = async (req, res) => {
    const wordle = await dao.findWordleById(req.params.wordleId);
    res.json(wordle);
  };
  const getWordlesByUserId = async (req, res) => {
    const wordles = await dao.findWordlesByUserId(req.params.userId);
    res.json(wordles);
  };
  const createWordle = async (req, res) => {
    const wordle = await dao.createWordle(req.body);
    res.json(wordle);
  };
  const deleteWordle = async (req, res) => {
    const status = await dao.deleteWordle(req.params.wordleId);
    res.json(status);
  };

  app.get("/api/wordle/:wordleId", getWordleById);
  app.get("/api/wordle/user/:userId", getWordlesByUserId);
  app.post("/api/wordle", createWordle);
  app.delete("/api/wordle/:wordleId", deleteWordle);
}