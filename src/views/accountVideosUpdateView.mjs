import fs from 'node:fs';
import gettext from 'gettext.js';

import indexControllers from '../controllers/index.mjs';

const accountVideosUpdateView = (dynamicValues) =>
    {
        const { lang, myAccount, video: { title, description } } = dynamicValues,
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
                        <li>${i18n.__('Edit')} ${title}</li>
                    </ul>
                </nav>
                <form class="back-office-form update" method="post" action="account-videos-add.html">
                    <h2>${i18n.__('Edit')} ${title}</h2>
                    <p>
                        <label for="update-title">${i18n.__('Video title')}</label>
                        <input id="update-title" name="title" type="text" maxlength="255" value="${title}" required>
                    </p>
                    <p>
                        <label for="update-description">${i18n.__('Video description')}</label>
                        <textarea id="update-description" name="description" required>${description}</textarea>
                    </p>
                    <p>
                        <input type="submit" value="Éditer">
                    </p>
                </form>
            </section>

`;
            return template;
    };

export default accountVideosUpdateView;
