import express from 'express';
import multer from 'multer';

import videoController from '../controllers/videoController.mjs';

const router = express.Router(),
    upload = multer({ dest: './public/uploads/' });

router.post('/', upload.single('video'), videoController.add);
router.put('/:id/increment', videoController.increment);
router.delete('/:id', videoController.remove);

export default router;
