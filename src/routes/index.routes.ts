import { response, Router } from 'express';
const router = Router();
import axios from "axios";

router.get('/', async (req, res) => {
    let data = await axios.get(req.protocol + "://" + req.get('host') + "/api/v1/leaderboard?limit=10").then((response) => {
        return response.data
    }).catch((e) => console.log(e))

    res.json(data)
})

export default router;