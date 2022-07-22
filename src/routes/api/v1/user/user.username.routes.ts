import { Router } from 'express';
const { users } = require('../../../../utils/db');

const router = Router();

router.post('/api/v1/username/:id', async (req, res) => {
    const { id } = req.params
    const { username } = req.body

    await users.updateUserName(id, username)

    res.send('User updated')
    
})

export default router;