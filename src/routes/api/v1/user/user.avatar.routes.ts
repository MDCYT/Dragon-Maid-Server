import { Router } from 'express';
// tslint:disable-next-line: no-var-requires
const { users } = require('../../../../utils/db');

const router = Router();

router.post('/api/v1/avatar/:id', async (req, res) => {
    const { url } = req.body
    const { id } = req.params

    await users.updateUserAvatar(id, url)

    res.send('User avatar updated')
})

export default router;