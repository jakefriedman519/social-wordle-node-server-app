import * as dao from "./dao.js";
import { v4 as uuidv4 } from "uuid";
export default function TournamentRoutes(app) {
  const createTournament = async (req, res) => {
    const now = new Date();
    now.setUTCDate(now.getDate());
    now.setUTCMonth(now.getMonth());
    now.setUTCFullYear(now.getFullYear());
    now.setUTCHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setDate(now.getDate() + req.body.durationDays);
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.json({});
    }
    const tournament = await dao.createTournament({
      _id: uuidv4(),
      name: req.body.name,
      maxPlayers: req.body.maxPlayers,
      creator: currentUser._id,
      players: [currentUser._id], // creator automatically joins
      startDate: now,
      endDate: end,
    });
    res.json(tournament);
  };

  const findTournamentById = async (req, res) => {
    const tournament = await dao.findTournamentById(req.params.tournamentId);
    res.json(tournament);
  };

  const findAllTournaments = async (req, res) => {
    const tournaments = await dao.findAllTournaments();
    res.json(tournaments);
  };

  const joinTournament = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.json({});
    }
    const tournament = await dao.joinTournament(
      req.params.tournamentId,
      currentUser._id,
    );
    res.json(tournament);
  };

  const endTournament = async (req, res) => {
    const tournament = await dao.endTournament(req.params.tournamentId);
    res.json(tournament);
  };

  const deleteTournament = async (req, res) => {
    const status = await dao.deleteTournament(req.params.tournamentId);
    res.json(status);
  };

  const getTournamentLeaderboard = async (req, res) => {
    const leaderboard = await dao.getLeaderboard(req.params.tournamentId);
    res.json(leaderboard);
  };

  app.post("/api/tournaments", createTournament);
  app.get("/api/tournaments", findAllTournaments);
  app.get("/api/tournaments/:tournamentId", findTournamentById);
  app.patch("/api/tournaments/join/:tournamentId", joinTournament);
  app.patch("/api/tournaments/end/:tournamentId", endTournament);
  app.delete("/api/tournaments/:tournamentId", deleteTournament);
  app.get(
    "/api/tournaments/:tournamentId/leaderboard",
    getTournamentLeaderboard,
  );
}
