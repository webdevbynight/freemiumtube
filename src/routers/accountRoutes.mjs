import url from 'node:url';
import fs from 'node:fs';
import express from 'express';

import accountController from '../controllers/accountController.mjs';

const router = express.Router();

router.get('/', accountController.getPage);

export default router;
