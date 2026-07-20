import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userName: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    performedAt: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Activity = model('Activity', activitySchema);

export default Activity;