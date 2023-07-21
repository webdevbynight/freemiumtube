import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from '../controllers/index.mjs';

const accountVideosDeleteView = (dynamicValues) =>
    {
        const { lang, myAccount, video: { userId, title, src } } = dynamicValues,
            i18n = gettext(),
            __dirname = indexControllers.getDirname('.'),
            json = fs.readFileSync(`${__dirname}/../i18n/locales/${lang}/account.json`, 'utf-8');
        
        i18n.setLocale(lang);
        i18n.loadJSON(json);

        let template =
`
            <section class="back-office-account">
                <nav class="breadcrumb">
                    <ul>
                        <li><a href="/account">${myAccount}</a></li>
                        <li><a href="/account/videos">${i18n.__('My videos')}</a></li>
                        <li>${i18n.__('Delete')} ${title}</li>
                    </ul>
                </nav>
                <form class="back-office-form confirm" method="post" action="account-videos-delete.html">
                    <h2>${i18n.__('Delete')} ${title}</h2>
                    <p>${i18n.__('Are you sure to really want to delete the video entitled %1', `<strong>${title}</strong>`)}</p>
                    <p>
                        <input name="userId" type="hidden" value="${userId}">
                        <input name="src" type="hidden" value="${src}">
                        <input type="reset" value="${i18n.__('Cancel')}">
                        <input type="submit" value="${i18n.__('Confirm')}">
                    </p>
                </form>
            </section>

`;
            return template;
    };

export default accountVideosDeleteView;
