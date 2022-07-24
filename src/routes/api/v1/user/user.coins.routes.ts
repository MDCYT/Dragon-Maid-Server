import { Router } from 'express';
// tslint:disable-next-line: no-var-requires
const { users } = require('../../../../utils/db');

const router = Router();

router.post('/api/v1/coins/:id', async (req, res) => {
    const { id } = req.params
    const { coins } = req.body

    await users.updateUserCoins(id, coins)

    res.send('User updated')
})

export default router;