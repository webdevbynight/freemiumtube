import express from 'express';

import videoController from '../controllers/videoController.mjs';

const router = express.Router();

router.put('/:id/increment', videoController.increment);

export default router;
