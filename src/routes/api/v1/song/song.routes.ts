import { Router } from 'express';
// tslint:disable-next-line: no-var-requires
const { records } = require('../../../../utils/db');

const router = Router();

router.post('/api/v1/record', async (req, res) => {

    const { id, score, title, dificulty } = req.body;

    records.createRecord({ id, score, title, dificulty });

    res.send('Record created');
});

export default router;