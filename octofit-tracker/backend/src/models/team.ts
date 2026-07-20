import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    motto: { type: String, required: true },
    captain: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    memberCount: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true
  }
);

const Team = model('Team', teamSchema);

export default Team;