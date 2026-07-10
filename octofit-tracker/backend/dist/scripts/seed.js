"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const database_1 = require("../config/database");
const models_1 = require("../models");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    await (0, database_1.connectToDatabase)();
    console.log('Seed the octofit_db database with test data');
    await models_1.User.deleteMany({});
    await models_1.Team.deleteMany({});
    await models_1.Activity.deleteMany({});
    await models_1.LeaderboardEntry.deleteMany({});
    await models_1.Workout.deleteMany({});
    const users = await models_1.User.insertMany([
        {
            name: 'Ava Patel',
            email: 'ava@example.com',
            age: 29,
            fitnessGoal: 'Improve endurance',
        },
        {
            name: 'Noah Kim',
            email: 'noah@example.com',
            age: 34,
            fitnessGoal: 'Build strength',
        },
        {
            name: 'Mina Chen',
            email: 'mina@example.com',
            age: 27,
            fitnessGoal: 'Increase flexibility',
        },
    ]);
    const teams = await models_1.Team.insertMany([
        {
            name: 'North Stars',
            sport: 'Running',
            members: [users[0]._id, users[1]._id],
            captain: users[0]._id,
        },
        {
            name: 'Peak Performers',
            sport: 'CrossFit',
            members: [users[2]._id],
            captain: users[2]._id,
        },
    ]);
    await models_1.Activity.insertMany([
        {
            user: users[0]._id,
            type: 'Run',
            durationMinutes: 35,
            caloriesBurned: 320,
        },
        {
            user: users[1]._id,
            type: 'Strength',
            durationMinutes: 45,
            caloriesBurned: 410,
        },
        {
            user: users[2]._id,
            type: 'Yoga',
            durationMinutes: 30,
            caloriesBurned: 180,
        },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        {
            user: users[0]._id,
            points: 1320,
            streak: 8,
        },
        {
            user: users[1]._id,
            points: 1180,
            streak: 5,
        },
        {
            user: users[2]._id,
            points: 1250,
            streak: 6,
        },
    ]);
    await models_1.Workout.insertMany([
        {
            name: 'Interval Sprint',
            category: 'Cardio',
            durationMinutes: 20,
            difficulty: 'Intermediate',
            description: 'Fast-paced running intervals with recovery walks.',
        },
        {
            name: 'Upper Body Strength',
            category: 'Strength',
            durationMinutes: 30,
            difficulty: 'Intermediate',
            description: 'Push-ups, rows, and shoulder presses for strength.',
        },
        {
            name: 'Mobility Flow',
            category: 'Recovery',
            durationMinutes: 25,
            difficulty: 'Beginner',
            description: 'Gentle stretches to improve flexibility and recovery.',
        },
    ]);
    console.log(`Inserted ${users.length} users, ${teams.length} teams, 3 activities, 3 leaderboard entries, and 3 workouts.`);
};
exports.seedDatabase = seedDatabase;
(0, exports.seedDatabase)().catch((error) => {
    console.error('Failed to seed database', error);
    process.exit(1);
});
