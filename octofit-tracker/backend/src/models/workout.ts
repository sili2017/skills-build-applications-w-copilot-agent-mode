import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    description: { type: String, required: true },
    recommendation: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Workout = model('Workout', workoutSchema);

export default Workout;