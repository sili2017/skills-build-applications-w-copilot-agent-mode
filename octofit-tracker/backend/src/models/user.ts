import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    weeklyGoalMinutes: { type: Number, required: true, default: 150 }
  },
  {
    timestamps: true
  }
);

const User = model('User', userSchema);

export default User;