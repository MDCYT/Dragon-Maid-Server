import { Router } from 'express';
const router = Router();
import axios from "axios";

router.get('/', async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const data = await axios.get(req.protocol + "://" + req.get('host') + "/api/v1/leaderboard?limit=" + limit + "&page=" + page).then(response => {
        return response.data
        // tslint:disable-next-line: no-console
    }).catch((e) => console.log(e))

    if (data.length === 0) return res.redirect('/');


    res.render('index', {
        meta: {
            title: 'Leaderboard',
            description: 'The leaderboard of the game',
            keywords: 'leaderboard, game, top, top 10',
            css: 'leaderboard.css'
        },
        title: 'Leaderboard',
        data
    })
})

export default router;