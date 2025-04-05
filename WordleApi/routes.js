import * as dao from "./dao.js";

export default function WordleExternalApiRoutes(app) {
  const getWordleByDay = async (req, res) => {
    const { day } = req.params;
    const wordle = await dao.getWordleByDay(day);
    res.json(wordle);
  };

  app.get("/api/wordle/:word", getWordleByDay);
}