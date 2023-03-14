import { Router } from 'express';
const router = Router();
router.get('*', (req, res) => {
  res.render('404')
})

export default router;