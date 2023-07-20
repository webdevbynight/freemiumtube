import express from 'express';

import router from './routers/index.mjs';

const app = express();

app.use(express.static('public', { index: false, etag: false }));
app.use(express.json());

app.use('/', router);
app.get('*', (req, res) =>
{
    // TODO: add a router managing 40x status codes
    res.status(404).send('Not found');
});

export default app;
