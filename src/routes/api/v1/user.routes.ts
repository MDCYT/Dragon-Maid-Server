import { Router } from 'express';
const {users} = require('../../../utils/db');

const router = Router();

router.post('/api/v1/user', (req, res) => {
    const { username, id, coins, progress, trophies } = req.body

    users.createUser({ username, id, coins, progress, trophies })

    res.send('User created')
})

router.post('/api/v1/user/update/:id', (req, res) => {
    const { id } = req.params
    const { username, coins, progress, trophies } = req.body

    users.updateUser(id, { username, coins, progress, trophies })

    res.send('User updated')
})

router.get('/api/v1/user/:id', async (req, res) => {
    const { id } = req.params

    const user = await users.getUserById(id)

    res.json(user)
})

router.post('/api/v1/user/username/:id', async (req, res) => {
    const { id } = req.params
    const { username } = req.body

    await users.updateUserName(id, username)

    res.send('User updated')
    
})

export default router;