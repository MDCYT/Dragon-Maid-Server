import { Router } from 'express';
// tslint:disable-next-line: no-var-requires
const { users } = require('../../../../utils/db');

const router = Router();

router.get('/api/v1/leaderboard', async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    const leaderboard = await users.getLeaderboard(limit, page);

    // tslint:disable-next-line: prefer-const
    let newLeaderboard = [];

    for (let i = 0; i < leaderboard.length; i++) {
        // Check if the name is empty
        if (leaderboard[i].username === '') {
            leaderboard[i].username = 'Anonymous';
        }

        // Check if the user has /t in the username, if has, delete it
        if (leaderboard[i].username.includes("/t")) {
            leaderboard[i].username = leaderboard[i].username.replace('/t', '');
            if (leaderboard[i].username === '') {
                leaderboard[i].username = 'Anonymous';
            }
        }

        newLeaderboard.push({
            username: leaderboard[i].username,
            coins: leaderboard[i].coins,
            progress: leaderboard[i].progress,
            trophies: leaderboard[i].trophies,
            avatar: leaderboard[i].avatar,
            rank: (Number(page) - 1) * Number(limit) + i + 1,
        });
    }
    res.json(newLeaderboard);
});

export default router;