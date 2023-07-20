import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from '../controllers/index.mjs';

const accountVideosAddTitleView = (dynamicValues) =>
    {
        const { lang, siteName, myAccount } = dynamicValues,
            i18n = gettext(),
            __dirname = indexControllers.getDirname('.'),
            json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/account.json`, 'utf-8');
        
        i18n.setLocale(lang);
        i18n.loadJSON(json);

        const template =
`
        <title>${i18n.__('Upload a new video')} — ${i18n.__('My videos')} — ${myAccount} — ${siteName}</title>
        <meta name="robots" content="noindex, nofollow, noarchive">
    </head>

    <body>
`;
            return template;
    };

export default accountVideosAddTitleView;
