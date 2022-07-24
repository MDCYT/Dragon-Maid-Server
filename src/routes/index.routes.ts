import { Router } from 'express';
const router = Router();
import axios from "axios";

router.get('/', async (req, res) => {
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;

    limit = Number(limit);
    page = Number(page);

    if (isNaN(limit)) limit = 10;
    if (isNaN(page)) page = 1;

    if (limit > 100) limit = 100;
    if (page < 1) page = 1;

    const data = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/leaderboard?limit=${limit}&page=${page}`).then(response => {
        return response.data
    }).catch((e) => {
        return {
            error: e.message
        }
    })

    if (data.length === 0) return res.redirect('/');


    res.render('index', {
        meta: {
            title: 'Leaderboard',
            description: 'The leaderboard of the game',
            keywords: 'leaderboard, game, top, top 10',
            css: 'leaderboard.css'
        },
        title: 'Leaderboard',
        data,
        page,
        limit
    })
})

export default router;