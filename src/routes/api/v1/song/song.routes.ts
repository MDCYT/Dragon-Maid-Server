import { Router } from 'express';
// tslint:disable-next-line: no-var-requires
const { records } = require('../../../../utils/db');
import axios from "axios";

const router = Router();

router.post('/api/v1/record', async (req, res) => {

    const { id, score, songID, dificulty } = req.body;

    records.createRecord({ id, score, songID, dificulty });

    res.send('Record created');
});

router.post('/api/v1/record/update/:id', async (req, res) => {
    const { id } = req.params;
    const { score, songID, dificulty } = req.body;
    records.updateRecord(id, { score, songID, dificulty });

    res.send('Record updated');
});

router.get('/api/v1/allsongs', async (req, res) => {
    const data = await records.getAllSongs();
    return res.json(data);
})

router.get('/api/v1/song/:id', async (req, res) => {
    const { id } = req.params;
    const data = await records.getSongInfo(id);
    return res.json(data);
})

router.get('/api/v1/record/:id', async (req, res) => {
    const { id } = req.params;
    const data = await records.getRecord(id);
    return res.json(data);
})

router.get('/api/v1/record/:id/:dificulty', async (req, res) => {
    const { id, dificulty } = req.params;

    let limit = req.query.limit || 10;
    let page = req.query.page || 1;

    limit = Number(limit);
    page = Number(page);

    if (isNaN(limit)) limit = 10;
    if (isNaN(page)) page = 1;

    if (limit > 100) limit = 100;
    if (page < 1) page = 1;

    const data = await records.getRecord(id, dificulty);
    const newData = [];

    let i = 0;
    let max = page * limit;
    for await (const record of data) {
        if (i >= max - limit && i < max) {
            const user = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/user/${record.id}`).then(response => {
                return response.data
            }).catch(err => {
                // tslint:disable-next-line: no-console
                console.log(err);
            })

            newData.push({
                songID: record.songID,
                score: record.score,
                dificulty: record.dificulty,
                user: {
                    username: user.username,
                    avatar: user.avatar
                }
            })
            i++;
        } else {
            break;
        }
    }
    return res.json(newData);
})

export default router;