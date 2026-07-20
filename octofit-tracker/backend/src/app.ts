import cors from 'cors';
import express from 'express';
import healthRouter from './routes/health.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    version: '0.0.0',
    endpoints: ['/api/health', '/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts']
  });
});

app.use('/api/health', healthRouter);
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

export default app;