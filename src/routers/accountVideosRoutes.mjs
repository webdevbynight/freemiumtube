import express from 'express';

import accountVideosController from '../controllers/accountVideosController.mjs';

const router = express.Router();

router.get('/', accountVideosController.getPage);

export default router;
