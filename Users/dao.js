import model from "./model.js";
import wordleGuessModel from "../WordleGuesses/model.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
};

export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(userId);

export const findUserByUsername = (username) =>
  model.findOne({ username: username });

export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });

export const updateUser = (userId, user) =>
  model.findOneAndUpdate({ _id: userId }, { $set: user }, { new: true });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const findUsersByRole = (role) => model.find({ role });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i");
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

export const findStatsForUser = async (userId) => {
  try {
    const result = await wordleGuessModel.aggregate([
      {
        $match: {
          userId,
          $or: [{ wordleId: { $exists: false } }, { wordleId: null }],
        },
      },
      { $addFields: { numGuesses: { $size: "$guesses" } } },

      {
        $facet: {
          stats: [
            {
              $group: {
                _id: null,
                gamesPlayed: { $sum: 1 },
                gamesWon: { $sum: { $cond: ["$completed", 1, 0] } },
                totalGuesses: {
                  $sum: { $cond: ["$completed", { $size: "$guesses" }, 0] },
                },
              },
            },
          ],
          // Calculate guess distribution for winning games only.
          // _id here is the number of guesses.
          distribution: [
            { $match: { completed: true } },
            { $group: { _id: "$numGuesses", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
          ],
          // Sort all games by finishedDate descending for streak computation.
          docsForStreaks: [
            { $sort: { finishedDate: -1 } },
            { $project: { completed: 1, finishedDate: 1 } },
          ],
        },
      },

      {
        $project: {
          stats: { $arrayElemAt: ["$stats", 0] },
          distribution: "$distribution",
          docsForStreaks: "$docsForStreaks",
        },
      },

      {
        $project: {
          gamesPlayed: "$stats.gamesPlayed",
          gamesWon: "$stats.gamesWon",
          averageGuesses: {
            $cond: [
              { $gt: ["$stats.gamesWon", 0] },
              { $divide: ["$stats.totalGuesses", "$stats.gamesWon"] },
              0,
            ],
          },
          streaks: {
            $function: {
              body: function (docs) {
                // currentStreak: count wins starting at the most recent game until the first loss
                let currentStreak = 0;
                for (let i = 0; i < docs.length; i++) {
                  if (docs[i].completed) {
                    currentStreak++;
                  } else {
                    break;
                  }
                }
                // maxStreak: find the longest series of consecutive wins
                let maxStreak = 0;
                let tempCount = 0;
                for (let i = 0; i < docs.length; i++) {
                  if (docs[i].completed) {
                    tempCount++;
                    if (tempCount > maxStreak) {
                      maxStreak = tempCount;
                    }
                  } else {
                    tempCount = 0;
                  }
                }
                return { currentStreak, maxStreak };
              },
              args: ["$docsForStreaks"],
              lang: "js",
            },
          },
          distribution: "$distribution",
        },
      },

      {
        $project: {
          gamesPlayed: 1,
          gamesWon: 1,
          currentStreak: "$streaks.currentStreak",
          maxStreak: "$streaks.maxStreak",
          averageGuesses: 1,
          // Convert the distribution into an array of length 6.
          distribution: {
            $function: {
              body: function (dist) {
                // Initialize a 6-slot array (index 0 = wins in 1 guess, etc.)
                const arr = [0, 0, 0, 0, 0, 0];
                dist.forEach((d) => {
                  // d._id is the number of guesses; subtract one for a 0-indexed array.
                  const idx = d._id - 1;
                  if (idx >= 0 && idx < arr.length) {
                    arr[idx] = d.count;
                  }
                });
                return arr;
              },
              args: ["$distribution"],
              lang: "js",
            },
          },
        },
      },
    ]);

    return (
      result[0] || {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        averageGuesses: 0,
        distribution: [0, 0, 0, 0, 0, 0],
      }
    );
  } catch (error) {
    throw error;
  }
};
