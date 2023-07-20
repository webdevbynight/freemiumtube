import express from 'express';

import accountVideosRoutes from './accountVideosRoutes.mjs';

import accountController from '../controllers/accountController.mjs';

const router = express.Router();

router.get('/', accountController.getPage);
router.use('/videos', accountVideosRoutes);

export default router;
