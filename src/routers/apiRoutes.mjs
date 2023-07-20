import express from 'express';

import apiVideoRoutes from './apiVideoRoutes.mjs';

const router = express.Router();

router.use('/videos', apiVideoRoutes);

export default router;
