import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trailblazers',
        motto: 'Keep moving forward',
        captain: 'Ava Martinez',
        points: 820,
        memberCount: 5
      },
      {
        name: 'Pulse Crew',
        motto: 'Find the rhythm',
        captain: 'Jordan Lee',
        points: 760,
        memberCount: 4
      },
      {
        name: 'Peak Makers',
        motto: 'Climb together',
        captain: 'Samira Patel',
        points: 905,
        memberCount: 6
      }
    ]);

    const users = await User.insertMany([
      {
        fullName: 'Ava Martinez',
        email: 'ava.martinez@example.com',
        role: 'student',
        teamName: teams[0].name,
        points: 245,
        weeklyGoalMinutes: 180
      },
      {
        fullName: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        role: 'student',
        teamName: teams[1].name,
        points: 210,
        weeklyGoalMinutes: 150
      },
      {
        fullName: 'Samira Patel',
        email: 'samira.patel@example.com',
        role: 'student',
        teamName: teams[2].name,
        points: 280,
        weeklyGoalMinutes: 210
      },
      {
        fullName: 'Noah Kim',
        email: 'noah.kim@example.com',
        role: 'teacher',
        teamName: teams[2].name,
        points: 190,
        weeklyGoalMinutes: 120
      }
    ]);

    await Activity.insertMany([
      {
        userName: users[0].fullName,
        activityType: 'Cycling',
        durationMinutes: 45,
        distanceKm: 18.2,
        caloriesBurned: 410,
        performedAt: new Date('2026-07-18T08:30:00.000Z')
      },
      {
        userName: users[1].fullName,
        activityType: 'Strength training',
        durationMinutes: 35,
        distanceKm: 0,
        caloriesBurned: 290,
        performedAt: new Date('2026-07-18T12:15:00.000Z')
      },
      {
        userName: users[2].fullName,
        activityType: 'Running',
        durationMinutes: 52,
        distanceKm: 6.8,
        caloriesBurned: 530,
        performedAt: new Date('2026-07-19T07:00:00.000Z')
      },
      {
        userName: users[3].fullName,
        activityType: 'Yoga',
        durationMinutes: 30,
        distanceKm: 0,
        caloriesBurned: 140,
        performedAt: new Date('2026-07-19T18:20:00.000Z')
      }
    ]);

    await Leaderboard.insertMany([
      {
        name: users[2].fullName,
        category: 'individual',
        points: 280,
        streakDays: 12,
        rank: 1
      },
      {
        name: teams[2].name,
        category: 'team',
        points: 905,
        streakDays: 9,
        rank: 1
      },
      {
        name: users[0].fullName,
        category: 'individual',
        points: 245,
        streakDays: 8,
        rank: 2
      },
      {
        name: teams[0].name,
        category: 'team',
        points: 820,
        streakDays: 7,
        rank: 2
      },
      {
        name: users[1].fullName,
        category: 'individual',
        points: 210,
        streakDays: 6,
        rank: 3
      }
    ]);

    await Workout.insertMany([
      {
        title: 'Morning mobility reset',
        focusArea: 'Mobility',
        durationMinutes: 15,
        difficulty: 'Easy',
        description: 'A joint-friendly flow to wake up the body and prepare for the day.',
        recommendation: 'Best for warm-ups, recovery days, or before class.'
      },
      {
        title: 'Campus cardio interval set',
        focusArea: 'Cardio',
        durationMinutes: 30,
        difficulty: 'Moderate',
        description: 'Short bursts of effort followed by walking recovery to build endurance.',
        recommendation: 'Good for athletes wanting a quick conditioning session.'
      },
      {
        title: 'Strength circuit stack',
        focusArea: 'Strength',
        durationMinutes: 40,
        difficulty: 'Moderate',
        description: 'A bodyweight and dumbbell circuit to target the full body.',
        recommendation: 'Useful for students balancing training with a busy schedule.'
      },
      {
        title: 'Recovery stretch session',
        focusArea: 'Recovery',
        durationMinutes: 20,
        difficulty: 'Easy',
        description: 'Slow stretching with breathwork to reduce soreness and improve flexibility.',
        recommendation: 'Ideal after a harder workout or competition day.'
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
