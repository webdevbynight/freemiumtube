import express from 'express';

import videoController from '../controllers/videoController.mjs';

const router = express.Router();

router.get('/:id', videoController.getPage);

export default router;
