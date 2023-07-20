import express from 'express';

import accountRoutes from './accountRoutes.mjs';

const router = express.Router();

router.get('/', (req, res) =>
{
    // TODO: create homeRoutes
    res.send('<!DOCTYPE html><html lang="en"><head><title>App</title><link rel="stylesheet" href="/css/styles.css" type="text/css"></head><body>Hello, world!</body></html>');
});
router.use('/account', accountRoutes);

export default router;
