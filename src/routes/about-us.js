import { Router } from 'express';
const router = Router()


router.get('/about-us', (req, res) => [
    res.render('about-us')
  ])
  
export default router;