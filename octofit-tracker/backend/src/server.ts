import express, { Request, Response } from 'express';
import { connectToDatabase } from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

export const app = express();
app.use(express.json());

const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const sendCollection = (res: Response, collection: unknown[]) => {
  res.json({ apiUrl: baseUrl, data: collection });
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiUrl: baseUrl });
});

app.get('/api/config', (_req: Request, res: Response) => {
  res.json({ apiUrl: baseUrl, environment: codespaceName ? 'codespaces' : 'local' });
});

app.get(['/api/users', '/api/users/'], async (_req: Request, res: Response) => {
  const users = await User.find({}).lean();
  sendCollection(res, users);
});

app.post(['/api/users', '/api/users/'], async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], async (_req: Request, res: Response) => {
  const teams = await Team.find({}).populate('members').populate('captain').lean();
  sendCollection(res, teams);
});

app.post(['/api/teams', '/api/teams/'], async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

app.get(['/api/activities', '/api/activities/'], async (_req: Request, res: Response) => {
  const activities = await Activity.find({}).populate('user').lean();
  sendCollection(res, activities);
});

app.post(['/api/activities', '/api/activities/'], async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('user').lean();
  sendCollection(res, leaderboard);
});

app.post(['/api/leaderboard', '/api/leaderboard/'], async (req: Request, res: Response) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req: Request, res: Response) => {
  const workouts = await Workout.find({}).lean();
  sendCollection(res, workouts);
});

app.post(['/api/workouts', '/api/workouts/'], async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export const startServer = async () => {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });
}
