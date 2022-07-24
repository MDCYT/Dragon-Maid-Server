import { Router } from 'express';
const router = Router();

router.get('/404',  (req, res) => {
    res.status(404).render('404')
})

export default router;