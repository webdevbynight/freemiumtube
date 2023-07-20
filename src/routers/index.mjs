import express from 'express';

import homeRoutes from './homeRoutes.mjs';
import accountRoutes from './accountRoutes.mjs';

const router = express.Router();

router.get('/', homeRoutes);
router.use('/account', accountRoutes);

export default router;
