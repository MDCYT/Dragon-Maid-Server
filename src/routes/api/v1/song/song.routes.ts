import { Router } from 'express';
// tslint:disable-next-line: no-var-requires
const { records } = require('../../../../utils/db');

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

export default router;