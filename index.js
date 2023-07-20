'use strict';

import 'dotenv/config';
import app from './src/app.mjs';

const port = process.env.PORT ?? 3000;

app.listen(port, (err) =>
{
    if (err) console.error(err);
    else console.info(`Server running on port ${port}`)
});
