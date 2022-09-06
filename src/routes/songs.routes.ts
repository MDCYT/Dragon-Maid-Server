import { Router } from 'express';
const router = Router();
import axios from "axios";

router.get('/songs/:id', async (req, res) => {

    const { id } = req.params;

    return res.redirect(`/songs/${id}/chaos`);

}).get('/songs/:id/:dificulty', async (req, res) => {

    const { id } = req.params;
    let { dificulty } = req.params;

    switch (dificulty) {
        case 'chaos':
            dificulty = "0";
            break;
        case 'harmony':
            dificulty = "1";
            break;
        default:
            dificulty = "0";
            break;
    }

    const songData = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/song/${id}`).then(response => {
        return response.data
    }).catch((e) => {
        return {
            error: e.message
        }
    })

    const songRecords = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/record/${id}/${dificulty}`).then(response => {
        return response.data
    }).catch((e) => {
        return {
            error: e.message
        }
    })

    res.json({songData, songRecords})
})


export default router;