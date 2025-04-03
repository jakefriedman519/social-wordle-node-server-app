import * as dao from "./dao.js";

export default function TournamentRoutes(app) {
  // TODO these are basic routes, we should add more functionality to the routes / change as needed
  const getTournamentById = async (req, res) => {
    const tournament = await dao.findTournamentById(req.params.tournamentId);
    res.json(tournament);
  }
  const getTournamentsByUserId = async (req, res) => {
    const tournaments = await dao.findTournamentsByUserId(req.params.userId);
    res.json(tournaments);
  }
  const getTournamentUsersAndGuessesById = async (req, res) => {
    const tournamentUsers = await dao.findTournamentUsersAndGuessesById(req.params.tournamentId);
    res.json(tournamentUsers);
  }
  const createTournament = async (req, res) => {
    const tournament = await dao.createTournament(req.body);
    res.json(tournament);
  }
  const deleteTournament = async (req, res) => {
    const status = await dao.deleteTournament(req.params.tournamentId);
    res.json(status);
  }
  const updateTournament = async (req, res) => {
    const tournament = await dao.updateTournament(req.params.tournamentId, req.body);
    res.json(tournament);
  }

  app.get("/api/tournament/:tournamentId", getTournamentById);
  app.get("/api/tournament/user/:userId", getTournamentsByUserId);
  app.get("/api/tournament/users/:tournamentId", getTournamentUsersAndGuessesById);
  app.post("/api/tournament", createTournament);
  app.delete("/api/tournament/:tournamentId", deleteTournament);
  app.patch("/api/tournament/:tournamentId", updateTournament);
}