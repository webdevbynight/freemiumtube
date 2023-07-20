import express from 'express';

import channelController from '../controllers/channelController.mjs';

const router = express.Router();

router.get('/:channel', channelController.getPage);

export default router;
