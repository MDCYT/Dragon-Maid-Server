import { Router } from 'express';
// tslint:disable-next-line: no-var-requires
const { users } = require('../../../../utils/db');

const router = Router();

router.post('/api/v1/progress/:id', async (req, res) => {
    const { id } = req.params
    const { progress } = req.body

    await users.updateUserProgress(id, progress)

    res.send('User updated')
})

export default router;