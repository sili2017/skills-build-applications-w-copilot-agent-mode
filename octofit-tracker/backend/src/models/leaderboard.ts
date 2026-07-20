import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    points: { type: Number, required: true },
    streakDays: { type: Number, required: true },
    rank: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;