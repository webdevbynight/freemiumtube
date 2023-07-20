import express from 'express';

import accountVideosController from '../controllers/accountVideosController.mjs';
import accountVideosAddController from '../controllers/accountVideosAddController.mjs';

const router = express.Router();

router.get('/', accountVideosController.getPage);
router.get('/add', accountVideosAddController.getPage);

export default router;
