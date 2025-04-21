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

  const deleteCommentById = async (req, res) => {
    const { id } = req.params;
    await dao.deleteCommentById(id);
    res.status(200).json({});
  };

  app.get("/api/comments/user/:userId", getCommentsByUser);
  app.get("/api/comments/day/:day", getCommentsByDay);
  app.post("/api/comments", createComment);
  app.delete("/api/comments/:id", deleteCommentById);
}
