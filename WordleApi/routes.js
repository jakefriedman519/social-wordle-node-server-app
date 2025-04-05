import * as dao from "./dao.js";

export default function WordleExternalApiRoutes(app) {
  const getWordleByDay = async (req, res) => {
    const { day } = req.params;
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!regEx.test(day)) {
      res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
      return;
    }
    const wordle = await dao.getWordleByDay(day);
    res.json(wordle);
  };

  app.get("/api/wordle-api/:day", getWordleByDay);
}