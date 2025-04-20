import * as dao from "./dao.js";

export default function CommentsRoutes(app) {
  const createComment = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.json({});
    } else {
      const createdComment = await dao.createComment(req.body);
      res.json(createdComment);
    }
  };

  const getCommentsByUser = async (req, res) => {
    const { userId } = req.params;
    const comments = await dao.findCommentsByUserId(userId);
    res.json(comments);
  };

  const getCommentsByDay = async (req, res) => {
    const { day } = req.params;
    const comments = await dao.findCommentsByWordleDay(day);
    res.json(comments);
  };

  app.get("/api/comments/user/:userId", getCommentsByUser);
  app.get("/api/comments/day/:day", getCommentsByDay);
  app.post("/api/comments", createComment);
}
