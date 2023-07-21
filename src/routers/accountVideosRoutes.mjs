import express from 'express';

import accountVideosController from '../controllers/accountVideosController.mjs';
import accountVideosAddController from '../controllers/accountVideosAddController.mjs';
import accountVideosDeleteController from '../controllers/accountVideosDeleteController.mjs';

const router = express.Router();

router.get('/', accountVideosController.getPage);
router.get('/add', accountVideosAddController.getPage);
router.get('/:id/delete', accountVideosDeleteController.getPage);

export default router;
