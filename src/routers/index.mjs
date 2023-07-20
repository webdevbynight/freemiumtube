import express from 'express';

import homeRoutes from './homeRoutes.mjs';
import videoRoutes from './videoRoutes.mjs';
import accountRoutes from './accountRoutes.mjs';
import apiRoutes from './apiRoutes.mjs';

const router = express.Router();

router.get('/', homeRoutes);
router.use('/videos', videoRoutes);
router.use('/account', accountRoutes);
router.use('/api', apiRoutes);

export default router;
