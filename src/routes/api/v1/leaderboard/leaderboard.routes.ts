import { Router } from 'express';
const { users } = require('../../../../utils/db');

const router = Router();

router.get('/api/v1/leaderboard', async (req, res) => {
    const limit = req.query.limit || 10;

    const leaderboard = await users.getLeaderboard(limit);

    res.json(leaderboard);
});

export default router;