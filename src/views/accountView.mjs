import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from '../controllers/index.mjs';

const accountView = (dynamicValues) =>
    {
        const { lang, myAccount } = dynamicValues,
            i18n = gettext(),
            __dirname = indexControllers.getDirname('.'),
            json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/account.json`, 'utf-8');
        
        i18n.setLocale(lang);
        i18n.loadJSON(json);

        const template =
`
            <section class="back-office-account">
                <h2>${myAccount}</h2>
                <ul class="dashboard">
                    <li><a href="/account/info">${i18n.__('My information')}</a></li>
                    <li><a href="/account/videos">${i18n.__('My videos')}</a></li>
                    <li><a href="/account/delete">${i18n.__('Delete my account')}</a></li>
                </ul>
            </section>
`;
            return template;
    };

export default accountView;
