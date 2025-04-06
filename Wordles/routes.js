import * as dao from "./dao.js";

export default function WordleRoutes(app) {
  // TODO these are basic routes, we should add more functionality to the routes / change as needed
  const getWordleById = async (req, res) => {
    const wordle = await dao.findWordles({ _id: req.params.wordleId });
    res.json(wordle[0]);
  };
  const getWordlesByUserId = async (req, res) => {
    let userId = req.params.userId;
    if (userId === "me") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.json([]);
      }
      userId = currentUser._id;
    }
    const wordles = await dao.findWordles({ userId });
    res.json(wordles[0]);
  };
  const getAllWordles = async (req, res) => {
    const query = req.query;
    if (query.title) {
      query.title = { $regex: query.title, $options: "i" };
    }
    if (query.createdDate) {
      const date = new Date(query.createdDate);
      date.setDate(date.getDate() + 1); // Move back one day
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      query.createdDate = { $gte: startOfDay, $lte: endOfDay };
    }
    const wordles = await dao.findWordles(query);
    res.json(wordles);
  };
  const createWordle = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const wordle = await dao.createWordle({...req.body, userId: currentUser._id});
    res.json(wordle);
  };
  const updateWordle = async (req, res) => {
    const wordle = await dao.updateWordle(req.params.wordleId, req.body);
    res.json(wordle);
  };
  const deleteWordle = async (req, res) => {
    const status = await dao.deleteWordle(req.params.wordleId);
    res.json(status);
  };

  app.get("/api/wordles/:wordleId", getWordleById);
  app.get("/api/wordles/user/:userId", getWordlesByUserId);
  app.get("/api/wordles", getAllWordles);
  app.post("/api/wordles", createWordle);
  app.patch("/api/wordles/:wordleId", updateWordle);
  app.delete("/api/wordles/:wordleId", deleteWordle);
}
