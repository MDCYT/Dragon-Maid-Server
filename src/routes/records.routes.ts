import { Router } from 'express';
const router = Router();
import axios from "axios";

router.get('/records', async (req, res) => {

    let data = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/allsongs`).then(response => {
        return response.data
    }).catch((e) => {
        return {
            error: e.message
        }
    })

    if (data.length === 0) data = [];

    res.render('records', {
        meta: {
            title: 'Records',
            description: 'All records of the module',
            keywords: 'leaderboard, game, top, top 10',
            css: 'leaderboard.css'
        },
        title: 'Records',
        data
    })
})

export default router;