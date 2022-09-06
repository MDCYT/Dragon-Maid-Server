import { Router } from 'express';
// tslint:disable-next-line: no-var-requires
const { users } = require('../../../../utils/db');

const router = Router();

router.post('/api/v1/user', (req, res) => {
    const { username, id, coins, progress, trophies, avatar } = req.body

    users.createUser({ username, id, coins, progress, trophies, avatar})

    res.send('User created')
})

router.post('/api/v1/user/update/:id', (req, res) => {
    const { id } = req.params
    const { username, coins, progress, trophies, avatar } = req.body

    users.updateUser(id, { username, coins, progress, trophies, avatar })

    res.send('User updated')
})

router.get('/api/v1/user/:id', async (req, res) => {
    const { id } = req.params

    const user = await users.getUserById(id)

    res.json(user)
})

router.get('/api/v1/username/:id', async (req, res) => {
    const { id } = req.params

    const user = await users.getUserById(id)

    res.json(user.username)
})


export default router;